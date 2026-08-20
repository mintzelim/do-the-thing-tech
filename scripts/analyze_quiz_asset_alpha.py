from collections import Counter
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

for name in FILES:
    image = Image.open(ASSET_DIR / name).convert('RGBA')
    alpha = [pixel[3] for pixel in image.getdata()]
    top_colors = Counter(image.getdata()).most_common(4)
    print({
        'file': name,
        'alpha_min': min(alpha),
        'alpha_max': max(alpha),
        'transparent_pixels': sum(value == 0 for value in alpha),
        'top_colors': top_colors,
    })
