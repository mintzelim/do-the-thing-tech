# Blog Image Upload Guide for DoTheThing

This guide explains how to add featured images to blog posts and manage them properly for deployment.

## Overview

Blog featured images are stored in **S3 storage** (not in the project repository) to prevent deployment timeouts. The blog system automatically references S3 URLs from the markdown frontmatter.

## Image Specifications

- **Format**: PNG or JPG
- **Aspect Ratio**: 16:9 (landscape orientation)
- **Recommended Dimensions**: 1280×720px or larger (will be displayed at various sizes)
- **File Size**: Keep under 500KB when possible (compressed PNGs recommended)
- **Style**: Pixel-art aesthetic matching the DoTheThing brand (see existing featured image for reference)

## Naming Convention

Use the following naming pattern for consistency:

```
{post-number}-{post-slug}.png
```

**Examples:**
- `23-best-adhd-tools-featured.png` (for post ID 23, slug: best-adhd-tools-2026)
- `21-best-jobs-featured.png` (for post ID 21, slug: best-jobs-for-creative-hyperfocused-brains)
- `15-free-tools-featured.png` (for post ID 15, slug: free-tools-2026)

## Step-by-Step Upload Process

### 1. Create Your Image

Design or generate a featured image that:
- Matches the pixel-art aesthetic
- Has a 16:9 aspect ratio
- Includes the post title or a relevant visual
- Is optimized for web (compressed, under 500KB if possible)

### 2. Upload to S3

From the project root directory, run:

```bash
manus-upload-file --webdev path/to/your/image.png
```

**Example:**
```bash
manus-upload-file --webdev ~/Downloads/23-best-adhd-tools-featured.png
```

The command will output something like:
```
File uploaded successfully!
Storage Path: /manus-storage/best-adhd-tools-featured_16393d40.png
```

**Copy the Storage Path** (you'll need it in the next step).

### 3. Update Blog Post Frontmatter

Open the blog post markdown file (e.g., `blog/23-best-adhd-tools-2026.md`) and add these fields to the frontmatter:

```yaml
---
id: '23'
title: "Best ADHD Tools in 2026: What Actually Works (And the Stack That Gets Things Done)"
description: "..."
slug: "/best-adhd-tools-2026"
excerpt: "..."
date: "May 12, 2026"
readTime: "10 min read"
category: "Tools & Resources"
featuredImage: "/manus-storage/best-adhd-tools-featured_16393d40.png"
featuredImageAlt: "Pixel art landscape with mountains and river showing Best ADHD Tools in 2026: What Actually Works"
primaryEntity: ADHD Productivity Tools
...
---
```

**Important Fields:**
- `featuredImage`: The S3 storage path from step 2
- `featuredImageAlt`: Descriptive alt text for accessibility and SEO (should include post title or key topic)

### 4. Regenerate Blog JSON

Run the blog generation script to update `blog-posts.json`:

```bash
cd /home/ubuntu/do-the-thing
node scripts/generate-blog-posts.mjs
```

This will:
- Parse the updated markdown frontmatter
- Extract the featured image URL
- Update `client/public/blog-posts.json`
- Display a summary of all blog posts

### 5. Save Checkpoint

Save a checkpoint to commit your changes:

```bash
# From the project root
webdev_save_checkpoint --description "Added featured image to [Post Title]"
```

### 6. Verify on Dev Server

Visit the dev server to verify the image displays correctly:
- **Blog listing page**: `/blog` - image should appear on the post card (200px height)
- **Individual post page**: `/blog/[slug]` - image should appear at the top (400px max height)

## Image Rendering

### On Blog Listing Page
- **Container**: 200px height
- **Aspect Ratio**: 16:9 (maintains aspect ratio, no distortion)
- **Display**: Card header with title overlay
- **Responsive**: Adjusts width on mobile while maintaining aspect ratio

### On Individual Blog Post Page
- **Container**: 400px max height
- **Aspect Ratio**: 16:9 (maintains aspect ratio)
- **Display**: Full-width header image with title overlay
- **Responsive**: Adjusts height on mobile while maintaining aspect ratio

## File Storage Location

- **Local backup**: `/home/ubuntu/webdev-static-assets/blog-images/`
- **S3 storage**: `/manus-storage/[filename]_[hash].png`
- **Never store**: In `client/public/images/` (causes deployment timeout)

## Troubleshooting

### Image Not Displaying

1. **Check the S3 URL**: Verify the `featuredImage` path in the markdown frontmatter matches the uploaded storage path
2. **Regenerate JSON**: Run `node scripts/generate-blog-posts.mjs` to ensure the URL is in `blog-posts.json`
3. **Clear cache**: Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R) to clear cached versions
4. **Check console**: Open browser DevTools (F12) and check for 404 errors in the Network tab

### Image Distorted or Wrong Size

1. **Verify aspect ratio**: Ensure the image is exactly 16:9
2. **Check dimensions**: Recommended minimum is 1280×720px
3. **Optimize file size**: Use PNG compression tools to reduce file size

### Checkpoint Save Fails (File Too Large)

1. **Compress the image**: Use online PNG/JPG compressors to reduce file size below 500KB
2. **Use manus-upload-file**: Always upload via the S3 tool, never commit large images to the repo
3. **Remove local copy**: Delete the image from `client/public/` after uploading to S3

## Best Practices

✅ **DO:**
- Use the S3 upload tool for all images
- Follow the naming convention for consistency
- Include descriptive alt text for accessibility
- Test on both dev server and production before publishing
- Keep images under 500KB when possible
- Use pixel-art style matching the brand

❌ **DON'T:**
- Store images in `client/public/images/` (causes deployment timeout)
- Commit large image files to GitHub
- Use generic alt text (be specific and descriptive)
- Skip the alt text field
- Use aspect ratios other than 16:9

## Example: Complete Workflow

```bash
# 1. Upload image
manus-upload-file --webdev ~/Downloads/21-best-jobs-featured.png
# Output: Storage Path: /manus-storage/best-jobs-featured_a1b2c3d4.png

# 2. Edit markdown file
# Add to blog/21-best-jobs-featured.md:
# featuredImage: "/manus-storage/best-jobs-featured_a1b2c3d4.png"
# featuredImageAlt: "Pixel art illustration of diverse professionals in creative careers"

# 3. Regenerate JSON
node scripts/generate-blog-posts.mjs

# 4. Test on dev server
# Visit http://localhost:3000/blog and http://localhost:3000/blog/best-jobs-for-creative-hyperfocused-brains

# 5. Save checkpoint
webdev_save_checkpoint --description "Added featured image to Best Jobs blog post"
```

## Questions?

If you encounter issues or have questions about the image upload process, refer to this guide or check the existing blog posts for examples of properly configured featured images.
