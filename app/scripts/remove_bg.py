"""
Background remover for Concept 3 card images.
Uses rembg with u2net_human_seg model (optimized for people).

Run from: f:\\Main and Private\\NetAnimation\\app\\
Command: python scripts/remove_bg.py
"""

import os
import sys
from pathlib import Path
from rembg import remove, new_session
from PIL import Image

# Use human segmentation model (best for people)
SESSION = new_session("u2net_human_seg")

# Paths
SCRIPT_DIR = Path(__file__).parent
APP_DIR = SCRIPT_DIR.parent
SOURCE_DIR = APP_DIR.parent / "source-images" / "concept3"
OUTPUT_DIR = APP_DIR / "public" / "cards"

# Files to process
CARDS = [
    "card_1_teen.png",
    "card_2_strong.png",
    "card_3_tired.png",
    "card_4_wise.png",
    "card_5_present.png",
]


def process_image(filename: str) -> None:
    input_path = SOURCE_DIR / filename
    output_path = OUTPUT_DIR / filename

    if not input_path.exists():
        print(f"  SKIP (not found): {input_path}")
        return

    print(f"  Processing: {filename}")

    with open(input_path, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data, session=SESSION)

    with open(output_path, "wb") as f:
        f.write(output_data)

    # Verify transparency
    with Image.open(output_path) as img:
        has_alpha = img.mode in ("RGBA", "LA") or (
            img.mode == "P" and "transparency" in img.info
        )
        size = output_path.stat().st_size / 1024
        print(f"    -> {output_path.name} ({img.size[0]}x{img.size[1]}, "
              f"{size:.0f}KB, alpha={has_alpha})")


def main() -> int:
    print(f"Source: {SOURCE_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if not SOURCE_DIR.exists():
        print(f"ERROR: source directory does not exist: {SOURCE_DIR}")
        return 1

    print("Removing backgrounds with u2net_human_seg model...")
    print()

    for card in CARDS:
        process_image(card)

    print()
    print("Done. All transparent PNGs saved to:")
    print(f"  {OUTPUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
