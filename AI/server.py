import os
import asyncio
import io
import re
import warnings
import sys
import time
from typing import Any, Optional, cast

import aiohttp
from PIL import Image
import torch
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from transformers import AutoProcessor, Qwen2_5_VLForConditionalGeneration, BitsAndBytesConfig, TextIteratorStreamer
from threading import Thread
from qwen_vl_utils import process_vision_info
import base64

MAX_IMAGE_SIZE = (252, 252)
CACHE_TTL_SECONDS = 30 * 60
API_BASE_URL = os.environ.get("API_BASE_URL", "http://localhost:3000")

def _filter_warnings() -> None:
    warnings.filterwarnings("ignore", category=UserWarning)
    warnings.filterwarnings("ignore", category=FutureWarning)

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

# ==========================================
# MODEL UTILITIES
# ==========================================
def load_model(model_name: str, device: str) -> Any:
    if device == "cuda":
        try:
            quantization_config = BitsAndBytesConfig(load_in_8bit=True)
            model = cast(Any, Qwen2_5_VLForConditionalGeneration.from_pretrained(
                model_name, quantization_config=quantization_config, device_map="auto"
            ))
            model.eval()
            print("Loaded model in 8-bit on GPU")
            return model
        except Exception:
            try:
                model = cast(Any, Qwen2_5_VLForConditionalGeneration.from_pretrained(
                    model_name, torch_dtype=torch.float16, low_cpu_mem_usage=True
                ))
                model.to("cuda")
                model.half()
                model.eval()
                print("Loaded model in fp16 on GPU")
                return model
            except Exception:
                pass

    model = cast(Any, Qwen2_5_VLForConditionalGeneration.from_pretrained(model_name))
    model.to("cpu")
    model.eval()
    return model

def resize_image(image: Image.Image) -> Image.Image:
    resized_image = image.copy()
    resized_image.thumbnail(MAX_IMAGE_SIZE)
    return resized_image

def get_model_device(model: Any) -> torch.device:
    for parameter in model.parameters(): return parameter.device
    for buffer in model.buffers(): return buffer.device
    return torch.device("cpu")

def prepare_inputs(processor: Any, images: list[Image.Image], prompt: str, device: str) -> dict:
    content = [{"type": "image", "image": img} for img in images]
    content.append({"type": "text", "text": prompt})
    messages = [{"role": "user", "content": content}]
    
    text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    vision_inputs = process_vision_info(messages)
    image_inputs = vision_inputs[0]
    video_inputs = vision_inputs[1]
    
    inputs = processor(text=[text], images=image_inputs, videos=video_inputs, padding=True, return_tensors="pt")
    for k, v in list(inputs.items()):
        if v.dtype.is_floating_point:
            inputs[k] = v.to(device, dtype=torch.float16 if "cuda" in str(device) else torch.float32)
        else:
            inputs[k] = v.to(device)
    return inputs


def build_roster_text(drawings: list[dict[str, Any]]) -> str:
    roster_lines: list[str] = []
    for index, drawing in enumerate(drawings, start=1):
        username = drawing.get("username") if isinstance(drawing, dict) else None
        roster_lines.append(f"{index}. {username or f'Combatant {index}'}")
    return "\n".join(roster_lines)

def analyze_winner_with_ai(model: Any, processor: Any, combat_text: str, device: str):
    analysis_prompt = (
        f"Analyze the following combat story and determine the winner confidence.\n"
        f"Story: {combat_text}\n"
        "Provide the result as: 'Prob1: <float>, Prob2: <float>, Winner: <name>'. "
        "Output ONLY this format."
    )
    messages = [{"role": "user", "content": [{"type": "text", "text": analysis_prompt}]}]
    text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = processor(text=[text], padding=True, return_tensors="pt")
    
    for k, v in list(inputs.items()):
        inputs[k] = v.to(device)

    with torch.no_grad():
        generated_ids = model.generate(**inputs, max_new_tokens=64)
    
    generated_only_ids = generated_ids[:, inputs["input_ids"].shape[1]:]
    result = processor.batch_decode(generated_only_ids, skip_special_tokens=True)[0].strip()

    prob1, prob2, winner = 0.5, 0.5, "Unknown"
    try:
        if m := re.search(r"Prob1:\s*([\d.]+)", result): prob1 = float(m.group(1))
        if m := re.search(r"Prob2:\s*([\d.]+)", result): prob2 = float(m.group(1))
        if m := re.search(r"Winner:\s*(.+)", result): winner = m.group(1).strip()
    except Exception:
        pass
    return prob1, prob2, winner

async def fetch_image(image_data: Any) -> Image.Image:
    try:
        if isinstance(image_data, dict):
            url = image_data.get("drawingData")
        else:
            url = image_data

        if not isinstance(url, str) or not url:
            print(f"ERROR: Expected a non-empty image string, got {type(url)}")
            return Image.new('RGB', MAX_IMAGE_SIZE, color='white')

        if url.startswith("data:") and "," in url:
            encoded = url.split(",", 1)[1]
        else:
            encoded = url

        if encoded.startswith("http://") or encoded.startswith("https://"):
            async with aiohttp.ClientSession() as session:
                async with session.get(encoded) as response:
                    response.raise_for_status()
                    content = await response.read()
            return Image.open(io.BytesIO(content)).convert("RGB")

        return Image.open(io.BytesIO(base64.b64decode(encoded))).convert("RGB")
            
    except Exception as e:
        print(f"Failed to load image: {e}")
        return Image.new('RGB', MAX_IMAGE_SIZE, color='white')


def read_prompt_template() -> str:
    prompt_path = os.path.join(__location__, "prompt.txt")
    with open(prompt_path, "r", encoding="utf-8") as prompt_file:
        return prompt_file.read()


def normalize_cached_story(cache_entry: Optional[dict[str, Any]]) -> Optional[str]:
    if not cache_entry:
        return None

    if time.monotonic() - cache_entry["stored_at"] > CACHE_TTL_SECONDS:
        return None

    return cache_entry["story"]


async def persist_story(game_id: str, story: str) -> None:
    story_url = f"{API_BASE_URL}/api/games/internal/{game_id}/story"
    async with aiohttp.ClientSession() as session:
        async with session.post(story_url, json={"story": story}) as response:
            if response.status >= 400:
                body = await response.text()
                raise RuntimeError(f"Failed to persist story: {response.status} {body}")


# ==========================================
# FASTAPI & WEBSOCKET SETUP
# ==========================================
app = FastAPI()
_filter_warnings()
os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

MODEL_NAME = "Qwen/Qwen2.5-VL-3B-Instruct"
device = "cuda" if torch.cuda.is_available() else "cpu"

print("Loading AI Model into memory... Please wait.")
processor = AutoProcessor.from_pretrained(MODEL_NAME)
model = load_model(MODEL_NAME, device)
model_device = str(get_model_device(model))
print(f"Server is ready! Model running on: {model_device}")


# ==========================================
# MULTIPLAYER BROADCAST MANAGER
# ==========================================
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}
        self.generating_games: set[str] = set()
        self.story_cache: dict[str, dict[str, Any]] = {}
        self.story_locks: dict[str, asyncio.Lock] = {}

    def get_lock(self, game_id: str) -> asyncio.Lock:
        lock = self.story_locks.get(game_id)
        if lock is None:
            lock = asyncio.Lock()
            self.story_locks[game_id] = lock
        return lock

    def get_cached_story(self, game_id: str) -> Optional[str]:
        return normalize_cached_story(self.story_cache.get(game_id))

    def cache_story(self, game_id: str, story: str) -> None:
        self.story_cache[game_id] = {
            "story": story,
            "stored_at": time.monotonic(),
        }

    async def connect(self, websocket: WebSocket, game_id: str):
        await websocket.accept()
        if game_id not in self.active_connections:
            self.active_connections[game_id] = []
        self.active_connections[game_id].append(websocket)

    def disconnect(self, websocket: WebSocket, game_id: str):
        if game_id in self.active_connections:
            if websocket in self.active_connections[game_id]:
                self.active_connections[game_id].remove(websocket)
            if len(self.active_connections[game_id]) == 0:
                del self.active_connections[game_id]
                if game_id in self.generating_games:
                    self.generating_games.remove(game_id)

    async def broadcast(self, message: str, game_id: str):
        if game_id in self.active_connections:
            for connection in self.active_connections[game_id]:
                try:
                    await connection.send_text(message)
                except Exception:
                    pass

manager = ConnectionManager()


@app.websocket("/ws/story/{game_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str):
    await manager.connect(websocket, game_id)
    print(f"Player joined game: {game_id}")
    
    try:
        data = await websocket.receive_json()

        if data.get("action") != "generate":
            return

        drawing_urls = data.get("drawings", [])
        env_name = data.get("environment", "a mysterious arena")

        if not drawing_urls:
            await websocket.send_text("Error: No drawings provided.")
            return

        async with manager.get_lock(game_id):
            cached_story = manager.get_cached_story(game_id)
            if cached_story:
                await websocket.send_text(cached_story)
                return

            manager.generating_games.add(game_id)

            images = [resize_image(await fetch_image(url)) for url in drawing_urls]
            roster_text = build_roster_text(drawing_urls)
            prompt_template = read_prompt_template()
            prompt = prompt_template.format(environment=env_name, roster=roster_text)

            inputs = prepare_inputs(processor, images, prompt, model_device)
            streamer = TextIteratorStreamer(processor.tokenizer, skip_prompt=True, skip_special_tokens=True)
            generation_kwargs = dict(inputs, streamer=streamer, max_new_tokens=1024)

            thread = Thread(target=model.generate, kwargs=generation_kwargs)
            thread.start()

            full_text = ""
            for new_text in streamer:
                full_text += new_text
                await manager.broadcast(new_text, game_id)
                await asyncio.sleep(0.01)

            manager.cache_story(game_id, full_text)

            try:
                await persist_story(game_id, full_text)
            except Exception as persist_error:
                print(f"Failed to persist cached story for {game_id}: {persist_error}")

            await manager.broadcast("\n\n*Analyzing winner...*\n", game_id)
            prob1, prob2, winner = analyze_winner_with_ai(model, processor, full_text, model_device)
            await manager.broadcast(f"**Final Verdict:** {winner} (P1: {prob1:.2f}, P2: {prob2:.2f})", game_id)

    except WebSocketDisconnect:
        print(f"Player disconnected from game {game_id}")
    except Exception as e:
        print(f"Generation error: {e}")
        if game_id in manager.generating_games:
            await manager.broadcast(f"\nServer Error: {str(e)}", game_id)
    finally:
        manager.disconnect(websocket, game_id)
        manager.generating_games.discard(game_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)