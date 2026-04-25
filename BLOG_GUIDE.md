# File-Based Blog System Guide

## Overview

DoTheThing now uses a **file-based blog system** where blog posts are stored as Markdown files in the `/blog` directory. This allows you to update blog content without touching React code.

## How It Works

1. **Blog posts are stored as Markdown files** in `/blog/` directory (e.g., `01-how-adhd-affects-task-management.md`)
2. **Build script parses Markdown files** and generates `public/blog-posts.json` at build time
3. **React component reads JSON** and displays blog posts dynamically
4. **Deploy to Vercel** - posts update automatically on each deployment

## Creating a New Blog Post

### Step 1: Create a Markdown File

Create a new file in the `/blog` directory with a descriptive name:

```
/blog/16-your-post-title.md
```

### Step 2: Add Frontmatter

Every blog post must start with YAML frontmatter (metadata between `---` markers):

```yaml
---
id: '16'
title: 'Your Post Title Here'
excerpt: 'Brief summary shown in blog listing (1-2 sentences)'
date: 'April 25, 2026'
readTime: '5 min read'
category: 'Category Name'
seoKeywords:
  - 'keyword1'
  - 'keyword2'
  - 'keyword3'
sources:
  - title: 'Source Title'
    url: 'https://example.com'
  - title: 'Another Source'
    url: 'https://example.com'
  - title: 'Third Source'
    url: 'https://example.com'
relatedPosts:
  - '1'
  - '3'
  - '5'
---
```

### Step 3: Write Content

After the frontmatter, write your blog post in Markdown:

```markdown
---
[frontmatter here]
---

# Your Post Title

Your content goes here. You can use standard markdown:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

## Subheadings

Multiple paragraphs separated by blank lines.

This is another paragraph.
```

### Step 4: Deploy

The build script automatically:
1. Parses all `.md` files in `/blog`
2. Converts Markdown to plain text
3. Generates `public/blog-posts.json`
4. React component loads and displays posts

## Frontmatter Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique numeric ID (as string). Must be unique across all posts. |
| `title` | Yes | Post title displayed in listings and detail view |
| `excerpt` | Yes | 1-2 sentence summary shown in blog listing |
| `date` | Yes | Publication date (format: "Month Day, Year") |
| `readTime` | Yes | Estimated read time (format: "X min read") |
| `category` | Yes | Post category for organization |
| `seoKeywords` | Yes | Array of 3+ keywords for SEO |
| `sources` | Yes | Array of 3+ sources with `title` and `url` |
| `relatedPosts` | Yes | Array of 3+ related post IDs (as strings) |

## Build Process

The build script is automatically run before deployment:

```bash
# Manual build (for testing)
node scripts/generate-blog-posts.mjs

# Automatic build (during deployment)
npm run build
```

The script:
1. Reads all `.md` files from `/blog` directory
2. Parses YAML frontmatter using `js-yaml`
3. Converts Markdown content to plain text
4. Generates `public/blog-posts.json` with all posts
5. Validates all posts have required fields

## Updating Existing Posts

1. Edit the `.md` file in `/blog`
2. Commit and push to GitHub
3. Deploy to Vercel
4. Build script regenerates JSON automatically
5. Posts update on next deployment

## Best Practices

### Naming Convention

Use descriptive filenames with numeric prefix:
```
01-how-adhd-affects-task-management.md
02-time-blindness-in-adhd.md
03-breaking-down-big-tasks.md
```

### Content Guidelines

- **Keep posts focused** on a single topic
- **Use clear headings** to structure content
- **Write for ADHD readers** - break content into digestible chunks
- **Include practical advice** - not just theory
- **Cite credible sources** - at least 3 per post
- **Link related posts** - helps with SEO and user navigation

### SEO Optimization

- **Keywords**: Include 3-5 relevant keywords
- **Title**: Make it descriptive and keyword-rich
- **Excerpt**: Write compelling summary to increase click-through
- **Category**: Use consistent categories across posts
- **Related Posts**: Link to topically related posts

### Source Requirements

- **Minimum 3 sources** per post
- **Use credible sources**: Government agencies, academic institutions, established organizations
- **Include full URLs** - must start with `https://`
- **Descriptive titles** - make it clear what the source is about

## File Structure

```
/blog
├── TEMPLATE.md                                    # Template for new posts
├── 01-how-adhd-affects-task-management.md
├── 02-time-blindness-in-adhd.md
├── 03-breaking-down-big-tasks.md
├── ...
└── 15-free-tools-2026.md

/scripts
└── generate-blog-posts.mjs                        # Build script

/public
└── blog-posts.json                                # Generated at build time

/client/src/pages
└── Blog.tsx                                       # React component (reads JSON)
```

## Testing

Run tests to verify blog generation:

```bash
npm test -- server/blog-generation.test.ts
```

Tests verify:
- All posts have required fields
- Sources are valid URLs
- Related posts reference existing posts
- Content is non-empty
- JSON is valid

## Deployment to Vercel

### Initial Setup

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`

### On Each Deploy

1. Vercel runs `npm run build`
2. Build script generates `public/blog-posts.json`
3. Vite bundles React app
4. Deploy to production
5. Blog posts automatically update

### Environment Variables

No special environment variables needed for blog generation. The script is self-contained.

## Troubleshooting

### "Cannot find package 'js-yaml'"

Install dependencies:
```bash
pnpm install
```

### "blog-posts.json not found"

Run build script manually:
```bash
node scripts/generate-blog-posts.mjs
```

### Posts not updating after deployment

1. Check that `.md` files are committed to Git
2. Verify build script ran successfully
3. Check `public/blog-posts.json` exists
4. Clear browser cache

### Markdown not parsing correctly

- Ensure frontmatter is between `---` markers
- Check YAML syntax (indentation matters)
- Verify all required fields are present

## Examples

### Example Post Structure

```markdown
---
id: '16'
title: 'ADHD and Morning Routines: How to Start Your Day Right'
excerpt: 'Practical strategies for building morning routines that work with your ADHD brain, not against it.'
date: 'April 25, 2026'
readTime: '6 min read'
category: 'Daily Habits'
seoKeywords:
  - 'ADHD morning routine'
  - 'executive function'
  - 'daily habits'
sources:
  - title: 'Psychology Today - ADHD and Routines'
    url: 'https://www.psychologytoday.com/'
  - title: 'Mayo Clinic - ADHD Management'
    url: 'https://www.mayoclinic.org/'
  - title: 'CHADD - Daily Strategies'
    url: 'https://www.chadd.org/'
relatedPosts:
  - '1'
  - '2'
  - '12'
---

# ADHD and Morning Routines: How to Start Your Day Right

Morning routines are hard for ADHD brains. Executive dysfunction is strongest in the morning...

[Your content here]
```

## Support

For issues or questions about the blog system:
1. Check this guide
2. Review existing posts as examples
3. Run tests to validate posts
4. Check build script output for errors

---

**Last Updated:** April 25, 2026
