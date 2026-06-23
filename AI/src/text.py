import sys
import subprocess
from pathlib import Path


AI_DIR = Path(__file__).resolve().parent.parent
REQUIREMENTS_FILE = AI_DIR / "requirements.txt"
DEPS_STAMP = AI_DIR / ".deps_installed"


def ensure_requirements() -> None:
	if not REQUIREMENTS_FILE.exists():
		return
	if DEPS_STAMP.exists() and DEPS_STAMP.stat().st_mtime >= REQUIREMENTS_FILE.stat().st_mtime:
		return
	subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(REQUIREMENTS_FILE)])
	DEPS_STAMP.touch()


ensure_requirements()

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_NAME = "Qwen/Qwen3-0.6B"
DEFAULT_PROMPT = "Generate a combat scenario between a knight and a dragon in a medieval fantasy setting. Describe the environment, the actions of both combatants, and the outcome of the battle."


def main() -> None:
	prompt = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_PROMPT
	device = "cuda" if torch.cuda.is_available() else "cpu"
	dtype = torch.float16 if device == "cuda" else torch.float32

	tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
	model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, dtype=dtype)
	model.to(device)
	model.eval()

	if tokenizer.pad_token is None:
		tokenizer.pad_token = tokenizer.eos_token


#using prompt.txt as input for content system
	system_prompt = (Path(__file__).resolve().parent / "prompt.txt").read_text(encoding="utf-8")
	messages = [
		{"role": "system", "content": system_prompt},

		{"role": "user", "content": prompt},
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
	response_text = tokenizer.decode(response_ids, skip_special_tokens=True).strip()
	print(response_text)


if __name__ == "__main__":
	main()