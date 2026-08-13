from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/do-the-thing')
BLOG_DIR = ROOT / 'blog'
OUTPUT = ROOT / 'docs' / 'content-quality-audit.json'

posts = []
for path in sorted(BLOG_DIR.glob('[0-9][0-9]-*.md')):
    raw = path.read_text(encoding='utf-8')
    body = re.sub(r'^---\n.*?\n---\n', '', raw, count=1, flags=re.S)
    words = re.findall(r"\b[\w’'-]+\b", re.sub(r'```.*?```', '', body, flags=re.S))
    image_refs = re.findall(r'!\[[^\]]*\]\([^\)]+\)', body)
    image_urls = re.findall(r'(?:featuredImage|image):\s*["\']?([^"\'\n]+)', raw)
    has_mistakes = bool(re.search(r'\b(gotchas?|common mistakes?|mistakes? to avoid|pitfalls?|common errors?)\b', body, flags=re.I))
    posts.append({
        'file': path.name,
        'wordCount': len(words),
        'inlineImageReferences': len(image_refs),
        'frontmatterImageReferences': len(image_urls),
        'hasCommonMistakeGuidance': has_mistakes,
    })

summary = {
    'postCount': len(posts),
    'postsAtOrAbove800Words': sum(post['wordCount'] >= 800 for post in posts),
    'postsWithAnyImageReference': sum(
        (post['inlineImageReferences'] + post['frontmatterImageReferences']) > 0 for post in posts
    ),
    'postsWithCommonMistakeGuidance': sum(post['hasCommonMistakeGuidance'] for post in posts),
    'postsBelow800Words': [post['file'] for post in posts if post['wordCount'] < 800],
    'postsWithoutImageReference': [
        post['file'] for post in posts
        if (post['inlineImageReferences'] + post['frontmatterImageReferences']) == 0
    ],
    'postsWithoutCommonMistakeGuidance': [
        post['file'] for post in posts if not post['hasCommonMistakeGuidance']
    ],
}

OUTPUT.write_text(json.dumps({'summary': summary, 'posts': posts}, indent=2) + '\n', encoding='utf-8')
print(json.dumps(summary, indent=2))
