from pathlib import Path

from PIL import Image

ASSET_DIR = Path('/home/ubuntu/webdev-static-assets')

for source in sorted(ASSET_DIR.glob('quiz-*-alpha.png')):
    image = Image.open(source).convert('RGBA')
    alpha = [pixel[3] for pixel in image.getdata()]
    transparent = sum(value == 0 for value in alpha)
    opaque = sum(value == 255 for value in alpha)
    print({
        'file': source.name,
        'alpha_min': min(alpha),
        'alpha_max': max(alpha),
        'transparent_pixels': transparent,
        'opaque_pixels': opaque,
    })
