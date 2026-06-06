import json, io, sys
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image

KEY = None
cfg = json.load(open(r"C:/Users/sunny/.claude/skills/nano-banana/.config.json"))
for v in cfg.values():
    if isinstance(v, str) and v.startswith("AIza"):
        KEY = v
client = genai.Client(api_key=KEY)
OUT = Path(r"C:/Users/sunny/repos/thebestmowers/public/images")

CAM = {"camera_body": "Sony A7 III", "lens": "35mm f/5.6", "lighting": "natural daylight", "quality": "sharp, photorealistic, high detail"}
EXC = ["brand logos", "text", "watermark", "product labels", "signage", "airbrushed", "cartoon", "distorted"]

JOBS = [
  ("ai-home-hero", {"scene": "a tidy green British suburban back garden lawn freshly mown with light and dark stripes", "subject": "a generic unbranded cordless rotary lawn mower mid-lawn", "environment": "flower borders, timber fence, patio in background, bright summer daylight", "cinematography": CAM, "constraints": {"exclusions": EXC}}),
  ("ai-small-garden", {"scene": "a small neat urban courtyard lawn behind a UK terraced house", "subject": "a compact generic unbranded cordless lawn mower on the grass", "environment": "brick patio, fence, potted plants, sunny", "cinematography": CAM, "constraints": {"exclusions": EXC}}),
  ("ai-large-garden", {"scene": "a large open British country garden with a wide green lawn and mature trees", "subject": "a generic unbranded self-propelled cordless lawn mower on the lawn", "environment": "expansive lawn, hedges, golden afternoon light", "cinematography": CAM, "constraints": {"exclusions": EXC}}),
  ("ai-self-propelled", {"scene": "a gently sloping green British lawn", "subject": "a generic unbranded self-propelled cordless lawn mower being guided uphill, hands on the handle", "environment": "slope, garden border, soft daylight, sense of easy motion", "cinematography": CAM, "constraints": {"exclusions": EXC + ["faces"]}}),
  ("ai-budget-mower", {"scene": "a modest British back garden lawn", "subject": "a simple affordable generic unbranded cordless lawn mower resting beside a wooden garden shed", "environment": "grass clippings, shed, fence, soft overcast light", "cinematography": CAM, "constraints": {"exclusions": EXC}}),
  ("ai-buying-guide", {"scene": "three different lawn mowers lined up side by side on a green lawn for comparison", "subjects": ["a generic battery cordless mower", "a generic petrol mower with a visible engine", "a generic corded electric mower with a power cable"], "environment": "flat lawn, daylight, even spacing, comparison layout", "cinematography": CAM, "constraints": {"exclusions": EXC}}),
]

cfgGen = types.GenerateContentConfig(response_modalities=["IMAGE"], image_config=types.ImageConfig(aspect_ratio="16:9"))
for name, prompt in JOBS:
    try:
        r = client.models.generate_content(model="gemini-2.5-flash-image", contents=[json.dumps(prompt)], config=cfgGen)
        part = next(p for p in r.candidates[0].content.parts if getattr(p, "inline_data", None))
        data = part.inline_data.data
        if isinstance(data, str):
            import base64; data = base64.b64decode(data)
        im = Image.open(io.BytesIO(data)).convert("RGB")
        # resize to 1200 wide max
        if im.width > 1200:
            im = im.resize((1200, round(im.height*1200/im.width)))
        dest = OUT / f"{name}.webp"
        im.save(dest, "WEBP", quality=82, method=6)
        print(f"OK {name} -> {dest.name} {im.size}")
    except Exception as e:
        print(f"FAIL {name}: {e}")
