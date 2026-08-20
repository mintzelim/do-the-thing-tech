from pathlib import Path
from PIL import Image

ASSET_DIR = Path('/home/ubuntu/webdev-static-assets')
FILES = [
    'quiz-thought-wanderer.png',
    'quiz-deep-dive-mind.png',
    'quiz-signal-catcher.png',
    'quiz-mood-powered-mind.png',
    'quiz-many-tabs-mind.png',
    'quiz-careful-scout.png',
]

for name in FILES:
    source = ASSET_DIR / name
    target = ASSET_DIR / name.replace('.png', '-clean.png')
    image = Image.open(source).convert('RGBA')
    pixels = image.load()

    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, alpha = pixels[x, y]
            is_green_backdrop = (
                green > 24
                and green > red * 1.16
                and green > blue * 1.10
            )
            if is_green_backdrop:
                pixels[x, y] = (red, green, blue, 0)

    image.save(target)
    print(f'Wrote {target}')
