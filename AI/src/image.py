# made by pfranke at 42Paris
# made by pfranke at 42Paris

import os
import sys
import warnings
from pathlib import Path
from typing import Any, Optional
from PIL import Image
import torch
from transformers import AutoProcessor, Qwen2_5_VLForConditionalGeneration, BitsAndBytesConfig


MAX_IMAGE_SIZE = (252, 252)


def ensure_requirements() -> None:
	"""Optional helper to install requirements if invoked manually."""
	requirements_file = Path(__file__).resolve().parent.parent / "requirements.txt"
	deps_stamp = Path(__file__).resolve().parent.parent / ".deps_installed"

	if not requirements_file.exists():
		return

	if deps_stamp.exists() and deps_stamp.stat().st_mtime >= requirements_file.stat().st_mtime:
		return

	# keep this helper but do not run it automatically on import
	import subprocess

	subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(requirements_file)])
	deps_stamp.touch()


def _filter_warnings() -> None:
	# suppress noisy, known warnings from third-party libs
	warnings.filterwarnings(
		"ignore",
		message=r"MatMul8bitLt: inputs will be cast from torch\.(float32|bfloat16) to float16 during quantization",
		category=UserWarning,
	)
	warnings.filterwarnings(
		"ignore",
		message=r"`torch\.cuda\.amp\.autocast\(args\.\.\.\)` is deprecated\. Please use `torch\.amp\.autocast\('cuda', args\.\.\.\)` instead\.",
		category=FutureWarning,
	)


def load_model(model_name: str, device: str) -> Any:
	"""Try to load the model in 8-bit, then fp16, then CPU."""
	model: Optional[Any] = None

	if device == "cuda":
		try:
			quantization_config = BitsAndBytesConfig(load_in_8bit=True)
			model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
				model_name, quantization_config=quantization_config, device_map="auto"
			)
			model.eval()
			print("Loaded model in 8-bit on GPU")
			return model
		except Exception:
			print("8-bit load failed, trying fp16 with low_cpu_mem_usage")
			try:
				model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
					model_name, torch_dtype=torch.float16, low_cpu_mem_usage=True
				)
				model.to("cuda")
				model.half()
				model.eval()
				print("Loaded model in fp16 on GPU")
				return model
			except Exception:
				print("fp16 load failed, falling back to CPU")
				try:
					torch.cuda.empty_cache()
				except Exception:
					pass

	# CPU fallback
	model = Qwen2_5_VLForConditionalGeneration.from_pretrained(model_name)
	model.to("cpu")
	model.eval()
	return model


def apply_vision_patch(processor: AutoProcessor, model: Any) -> None:
	# TODO: better patch, this is a minimal compatibility fix
	vision_config = getattr(model.config, "vision_config", None)
	patch_size = getattr(vision_config, "patch_size", None)
	if patch_size is not None:
		processor.patch_size = patch_size
		if hasattr(processor, "image_processor"):
			processor.image_processor.patch_size = patch_size


def resize_image(image: Image.Image) -> Image.Image:
	resized_image = image.copy()
	resized_image.thumbnail(MAX_IMAGE_SIZE)
	return resized_image


def get_model_device(model: Any) -> torch.device:
	for parameter in model.parameters():
		return parameter.device
	for buffer in model.buffers():
		return buffer.device
	return torch.device("cpu")


def prepare_inputs(processor: AutoProcessor, images: list[Image.Image], prompt: str, device: str) -> dict:
	# Qwen2.5-VL uses specific system/user message formats
	content = []
	for img in images:
		content.append({"type": "image", "image": img})
	content.append({"type": "text", "text": prompt})

	messages = [
		{
			"role": "user",
			"content": content,
		}
	]
	text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
	
	from qwen_vl_utils import process_vision_info
	image_inputs, video_inputs = process_vision_info(messages)
	
	inputs = processor(
		text=[text], 
		images=image_inputs, 
		videos=video_inputs, 
		padding=True, 
		return_tensors="pt"
	)
	
	for k, v in list(inputs.items()):
		if v.dtype.is_floating_point:
			if device == "cuda":
				inputs[k] = v.to(device, dtype=torch.float16)
			else:
				inputs[k] = v.to(device, dtype=torch.float32)
		else:
			inputs[k] = v.to(device)
	return inputs


def generate_text(model: Any, processor: AutoProcessor, inputs: dict, device: str, max_tokens: int = 48) -> str:
	try:
		with torch.no_grad():
			if device == "cuda":
				with torch.cuda.amp.autocast(dtype=torch.float16):
					generated_ids = model.generate(**inputs, max_new_tokens=max_tokens)
			else:
				generated_ids = model.generate(**inputs, max_new_tokens=max_tokens)
	except (RuntimeError, torch.cuda.OutOfMemoryError) as e:
		print("Generation OOM on GPU, retrying on CPU with smaller tokens:", e)
		try:
			torch.cuda.empty_cache()
		except Exception:
			pass
		device = "cpu"
		model.to("cpu")
		for k, v in list(inputs.items()):
			if v.dtype.is_floating_point:
				inputs[k] = v.to(device, dtype=torch.float32)
			else:
				inputs[k] = v.to(device)
		with torch.no_grad():
			generated_ids = model.generate(**inputs, max_new_tokens=min(max_tokens, 12))

	# decode
	generated_only_ids = generated_ids[:, inputs["input_ids"].shape[1]:]
	generated_text = processor.batch_decode(generated_only_ids, skip_special_tokens=True)[0].strip()
	return generated_text


def analyze_winner_with_ai(model: Any, processor: AutoProcessor, combat_text: str, device: str) -> tuple[float, float, str]:
	# Use the model to analyze its own generation
	analysis_prompt = (
		f"Analyze the following combat story and determine the winner confidence.\n"
		f"Story: {combat_text}\n"
		"Provide the result as: 'Prob1: <float>, Prob2: <float>, Winner: <name>'. "
		"Output ONLY this format."
	)
	
	# Prepare inputs (text only for analysis pass)
	messages = [{"role": "user", "content": [{"type": "text", "text": analysis_prompt}]}]
	text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
	inputs = processor(text=[text], padding=True, return_tensors="pt")
	
	# Move to device
	for k, v in list(inputs.items()):
		inputs[k] = v.to(device)

	result = generate_text(model, processor, inputs, device, max_tokens=64)
	
	# Parse result (e.g., "Prob1: 0.9, Prob2: 0.1, Winner: Image 1")
	prob_img1, prob_img2, winner = 0.5, 0.5, "Unknown"
	try:
		import re
		p1_match = re.search(r"Prob1:\s*([\d.]+)", result)
		p2_match = re.search(r"Prob2:\s*([\d.]+)", result)
		winner_match = re.search(r"Winner:\s*(.+)", result)
		
		if p1_match: prob_img1 = float(p1_match.group(1))
		if p2_match: prob_img2 = float(p2_match.group(1))
		if winner_match: winner = winner_match.group(1).strip()
	except Exception as e:
		print(f"AI Analysis Parsing failed: {e}")

	return prob_img1, prob_img2, winner


def main(argv: Optional[list] = None) -> None:
	argv = argv or sys.argv
	_filter_warnings()

	img1_path = Path(argv[1]) if len(argv) > 1 else Path(__file__).resolve().parent / "batman.png"
	img2_path = Path(argv[2]) if len(argv) > 2 else Path(__file__).resolve().parent / "image1.png"

	images = []
	for p in [img1_path, img2_path]:
		if p.exists():
			images.append(resize_image(Image.open(p).convert("RGB")))
		else:
			print(f"Warning: {p} not found, skipping.")

	if not images:
		print("Error: No images found.")
		return

	model_name = "Qwen/Qwen2.5-VL-3B-Instruct"
	processor = AutoProcessor.from_pretrained(model_name)

	os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
	device = "cuda" if torch.cuda.is_available() else "cpu"

	model = load_model(model_name, device)
	model_device = get_model_device(model)

	prompt_path = Path(__file__).resolve().parent / "prompt.txt"
	if prompt_path.exists():
		prompt = prompt_path.read_text(encoding="utf-8")
	else:
		prompt = "Describe the combat between these two characters."

	inputs = prepare_inputs(processor, images, prompt, str(model_device))
	generated_text = generate_text(model, processor, inputs, str(model_device), max_tokens=1024)
	print(generated_text)
	print("-" * 30)

	# Analysis
	prob_img1, prob_img2, winner = analyze_winner_with_ai(model, processor, generated_text, str(model_device))
	print(f"Winner Analysis:")
	print(f"Prob Image 1: {prob_img1:.2f}")
	print(f"Prob Image 2: {prob_img2:.2f}")
	print(f"Final Verdict: {winner}")


if __name__ == "__main__":
	main()
