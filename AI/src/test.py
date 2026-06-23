import os
import sys
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image
import torch
from transformers import AutoModelForCausalLM, AutoProcessor, AutoTokenizer, BitsAndBytesConfig, LlavaForConditionalGeneration


AI_DIR = Path(__file__).resolve().parent.parent
REQUIREMENTS_FILE = AI_DIR / "requirements.txt"
DEPS_STAMP = AI_DIR / ".deps_installed"
SYSTEM_PROMPT_FILE = Path(__file__).resolve().parent / "prompt.txt"
MODEL_NAME = "xtuner/llava-phi-3-mini-hf"
TEXT_MODEL_NAME = "Qwen/Qwen3-0.6B"
DEFAULT_PROMPT = "Write a medieval combat scene where a knight fights the creature or character shown in the image. Be vivid, coherent, and end with a clear winner."


def ensure_requirements() -> None:
	if not REQUIREMENTS_FILE.exists():
		return
	if DEPS_STAMP.exists() and DEPS_STAMP.stat().st_mtime >= REQUIREMENTS_FILE.stat().st_mtime:
		return
	subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(REQUIREMENTS_FILE)])
	DEPS_STAMP.touch()


def _filter_warnings() -> None:
	import warnings

	warnings.filterwarnings(
		"ignore",
		message=r"MatMul8bitLt: inputs will be cast from torch\.float32 to float16 during quantization",
		category=UserWarning,
	)
	warnings.filterwarnings(
		"ignore",
		message=r"`torch\.cuda\.amp\.autocast\(args\.\.\.\)` is deprecated\. Please use `torch\.amp\.autocast\('cuda', args\.\.\.\)` instead\.",
		category=FutureWarning,
	)


def load_model(device: str) -> Any:
	if device == "cuda":
		try:
			quantization_config = BitsAndBytesConfig(load_in_8bit=True)
			model: Any = LlavaForConditionalGeneration.from_pretrained(
				MODEL_NAME,
				quantization_config=quantization_config,
				device_map="auto",
			)
			model.eval()
			print("Loaded model in 8-bit on GPU")
			return model
		except Exception as exc:
			print("8-bit load failed, trying fp16:", exc)
			try:
				model = LlavaForConditionalGeneration.from_pretrained(
					MODEL_NAME,
					torch_dtype=torch.float16,
					low_cpu_mem_usage=True,
				)
				model.to("cuda")
				model.half()
				model.eval()
				print("Loaded model in fp16 on GPU")
				return model
			except Exception as exc2:
				print("fp16 load failed, falling back to CPU:", exc2)
				try:
					torch.cuda.empty_cache()
				except Exception:
					pass

	model: Any = LlavaForConditionalGeneration.from_pretrained(MODEL_NAME)
	model.to("cpu")
	model.eval()
	return model


def load_text_model(device: str) -> tuple[Any, Any]:
	dtype = torch.float16 if device == "cuda" else torch.float32
	tokenizer: Any = AutoTokenizer.from_pretrained(TEXT_MODEL_NAME)
	model: Any = AutoModelForCausalLM.from_pretrained(TEXT_MODEL_NAME, dtype=dtype)
	model.to(device)
	model.eval()
	if tokenizer.pad_token is None:
		tokenizer.pad_token = tokenizer.eos_token
	return tokenizer, model


def apply_vision_patch(processor: Any, model: Any) -> None:
	# TODO: better patch, this is a minimal compatibility fix
	vision_config = getattr(model.config, "vision_config", None)
	patch_size = getattr(vision_config, "patch_size", None)
	if patch_size is not None:
		processor.patch_size = patch_size
		if hasattr(processor, "image_processor"):
			processor.image_processor.patch_size = patch_size


def prepare_inputs(processor: Any, image: Image.Image, prompt: str, device: str) -> dict[str, Any]:
	# choosing dtype and device to avoid out of memory
	inputs = processor(images=image, text=prompt, return_tensors="pt")
	for key, value in list(inputs.items()):
		if value.dtype.is_floating_point:
			inputs[key] = value.to(device, dtype=torch.float16 if device == "cuda" else torch.float32)
		else:
			inputs[key] = value.to(device)
	return inputs


def generate_response(model: Any, processor: Any, inputs: dict[str, Any], device: str) -> str:
	try:
		with torch.no_grad():
			if device == "cuda":
				with torch.cuda.amp.autocast(dtype=torch.float16):
					generated_ids = model.generate(**inputs, max_new_tokens=192)
			else:
				generated_ids = model.generate(**inputs, max_new_tokens=192)
	except (RuntimeError, torch.cuda.OutOfMemoryError) as exc:
		print("Generation OOM on GPU, retrying on CPU with smaller tokens:", exc)
		try:
			torch.cuda.empty_cache()
		except Exception:
			pass
		model.to("cpu")
		for key, value in list(inputs.items()):
			if value.dtype.is_floating_point:
				inputs[key] = value.to("cpu", dtype=torch.float32)
			else:
				inputs[key] = value.to("cpu")
		with torch.no_grad():
			generated_ids = model.generate(**inputs, max_new_tokens=96)

	generated_only_ids = generated_ids[:, inputs["input_ids"].shape[1]:]
	return processor.batch_decode(generated_only_ids, skip_special_tokens=True)[0].strip()


def generate_combat_description(
	tokenizer: Any,
	model: Any,
	image_description: str,
	system_prompt: str,
	user_prompt: str,
	device: str,
) -> str:
	messages = [
		{"role": "system", "content": system_prompt},
		{
			"role": "user",
			"content": (
				"You are given a neutral description of the image from another model. "
				"Use it as source material to write the combat scene, but do not repeat the description verbatim.\n"
				f"Image facts: {image_description}\n"
				f"User request: {user_prompt}\n"
				"Write a detailed medieval combat scene where a knight fights the creature or character from the image. "
				"Keep it vivid, coherent, and finish with one clear winner."
			),
		},
	]

	encoded_inputs = tokenizer.apply_chat_template(
		messages,
		tokenize=True,
		add_generation_prompt=True,
		return_tensors="pt",
	)
	if isinstance(encoded_inputs, torch.Tensor):
		input_ids = encoded_inputs.to(device)
		attention_mask = None
	else:
		input_ids = encoded_inputs["input_ids"].to(device)
		attention_mask = encoded_inputs.get("attention_mask")
		if attention_mask is not None:
			attention_mask = attention_mask.to(device)

	with torch.inference_mode():
		output_ids = model.generate(
			input_ids,
			attention_mask=attention_mask,
			eos_token_id=tokenizer.eos_token_id,
			pad_token_id=tokenizer.eos_token_id,
			max_new_tokens=2048,
			do_sample=False,
		)

	response_ids = output_ids[0][input_ids.shape[-1]:]
	return tokenizer.decode(response_ids, skip_special_tokens=True).strip()


def build_prompt(system_prompt: str, user_prompt: str) -> str:
	return (
		f"SYSTEM: {system_prompt}\n"
		"USER: <image>\n"
		"Describe the image neutrally and concretely. Focus on the main character or creature, its appearance, pose, mood, and any obvious visual details. "
		"Do not write the combat scene yet.\n"
		f"Extra user context: {user_prompt}\n"
		"ASSISTANT:"
	)


def main() -> None:
	_filter_warnings()
	ensure_requirements()

	image_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent / "image.png"
	user_prompt = sys.argv[2] if len(sys.argv) > 2 else DEFAULT_PROMPT
	system_prompt = SYSTEM_PROMPT_FILE.read_text(encoding="utf-8")
	image = Image.open(image_path).convert("RGB")

	os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
	device = "cuda" if torch.cuda.is_available() else "cpu"

	processor: Any = AutoProcessor.from_pretrained(MODEL_NAME)
	model = load_model(device)
	apply_vision_patch(processor, model)

	prompt = build_prompt(system_prompt, user_prompt)
	inputs = prepare_inputs(processor, image, prompt, device)
	image_description = generate_response(model, processor, inputs, device)

	text_tokenizer, text_model = load_text_model(device)
	combat_text = generate_combat_description(
		text_tokenizer,
		text_model,
		image_description,
		system_prompt,
		user_prompt,
		device,
	)
	print(combat_text)


if __name__ == "__main__":
	main()