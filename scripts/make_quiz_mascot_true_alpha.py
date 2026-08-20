from pathlib import Path

from PIL import Image

ASSET_DIR = Path('/home/ubuntu/webdev-static-assets')
FILES = [
    'quiz-spark-starter-clean.png',
    'quiz-thought-wanderer-clean.png',
    'quiz-deep-dive-mind-clean.png',
    'quiz-signal-catcher-clean.png',
    'quiz-mood-powered-mind-clean.png',
    'quiz-many-tabs-mind-clean.png',
    'quiz-careful-scout-clean.png',
]


def is_baked_checkerboard_pixel(red: int, green: int, blue: int) -> bool:
    return min(red, green, blue) >= 232 and max(red, green, blue) - min(red, green, blue) <= 4


for name in FILES:
    source = ASSET_DIR / name
    target = ASSET_DIR / name.replace('-clean.png', '-alpha.png')
    image = Image.open(source).convert('RGBA')
    pixels = image.load()

    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, alpha = pixels[x, y]
            if is_baked_checkerboard_pixel(red, green, blue):
                pixels[x, y] = (red, green, blue, 0)

    image.save(target)
    print(f'Wrote {target}')
