import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Blog Metadata Validation Tests
 * 
 * These tests validate that blog posts have:
 * - Proper source citations (sources array with title and url)
 * - Related post backlinks (relatedPosts array with valid post IDs)
 * - Consistent structure and required fields
 * 
 * Note: Blog posts are now loaded from blog-posts.json instead of being hardcoded in Blog.tsx
 */

describe('Blog Post Metadata', () => {
  // Read the generated blog-posts.json file
  const blogPostsPath = path.join(process.cwd(), 'public/blog-posts.json');
  const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');
  const blogPosts = JSON.parse(blogPostsContent);

  describe('Blog Posts Exist', () => {
    it('should have blog posts defined', () => {
      expect(Array.isArray(blogPosts)).toBe(true);
      expect(blogPosts.length).toBeGreaterThan(0);
    });
  });

  describe('Blog Posts Have Sources (Citations)', () => {
    it('all blog posts should have sources array', () => {
      blogPosts.forEach(post => {
        expect(Array.isArray(post.sources)).toBe(true);
        expect(post.sources.length).toBeGreaterThan(0);
        post.sources.forEach(source => {
          expect(source.title).toBeTruthy();
          expect(source.url).toBeTruthy();
        });
      });
    });
  });

  describe('Blog Posts Have Related Posts (Backlinks)', () => {
    it('all blog posts should have relatedPosts array', () => {
      blogPosts.forEach(post => {
        expect(Array.isArray(post.relatedPosts)).toBe(true);
      });
    });
  });

  describe('Source URLs are Valid', () => {
    it('all source URLs should be valid', () => {
      blogPosts.forEach(post => {
        post.sources.forEach(source => {
          expect(source.url).toMatch(/^https?:\/\//);
          expect(source.url.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Related Post IDs are Valid', () => {
    it('all related post IDs should be strings', () => {
      blogPosts.forEach(post => {
        post.relatedPosts.forEach(relatedId => {
          expect(typeof relatedId).toBe('string');
        });
      });
    });
  });

  describe('Blog Structure Consistency', () => {
    it('all posts have required fields', () => {
      const requiredFields = ['id', 'title', 'excerpt', 'content', 'date', 'readTime', 'category', 'seoKeywords', 'sources', 'relatedPosts'];
      
      blogPosts.forEach(post => {
        requiredFields.forEach(field => {
          expect(post).toHaveProperty(field);
        });
      });
    });
  });
});
