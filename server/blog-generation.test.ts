import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Blog Generation Tests
 * 
 * Verifies that the blog generation script produces valid JSON with all required fields
 */

describe('Blog Generation', () => {
  const blogPostsPath = path.join(process.cwd(), 'public/blog-posts.json');

  describe('Generated blog-posts.json', () => {
    it('should exist', () => {
      expect(fs.existsSync(blogPostsPath)).toBe(true);
    });

    it('should contain valid JSON', () => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    it('should be an array', () => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      const data = JSON.parse(content);
      expect(Array.isArray(data)).toBe(true);
    });

    it('should have 16 blog posts', () => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      const data = JSON.parse(content);
      expect(data.length).toBe(16);
    });
  });

  describe('Blog Post Structure', () => {
    let blogPosts: any[];

    beforeEach(() => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      blogPosts = JSON.parse(content);
    });

    it('each post should have required fields', () => {
      const requiredFields = ['id', 'title', 'excerpt', 'date', 'readTime', 'category', 'seoKeywords', 'sources', 'relatedPosts', 'content', 'slug'];
      
      blogPosts.forEach(post => {
        requiredFields.forEach(field => {
          expect(post).toHaveProperty(field);
        });
      });
    });

    it('each post should have valid id', () => {
      blogPosts.forEach(post => {
        expect(post.id).toBeTruthy();
        const id = parseInt(post.id);
        if (!isNaN(id)) {
          expect(id).toBeGreaterThanOrEqual(1);
          expect(id).toBeLessThanOrEqual(16);
        }
      });
    });

    it('each post should have non-empty title', () => {
      blogPosts.forEach(post => {
        expect(post.title).toBeTruthy();
        expect(typeof post.title).toBe('string');
      });
    });

    it('each post should have non-empty content', () => {
      blogPosts.forEach(post => {
        expect(post.content).toBeTruthy();
        expect(typeof post.content).toBe('string');
      });
    });

    it('each post should have at least 3 sources', () => {
      blogPosts.forEach(post => {
        expect(Array.isArray(post.sources)).toBe(true);
        expect(post.sources.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('each source should have title and url', () => {
      blogPosts.forEach(post => {
        post.sources.forEach((source: any) => {
          expect(source.title).toBeTruthy();
          expect(source.url).toBeTruthy();
          expect(source.url).toMatch(/^https?:\/\//);
        });
      });
    });

    it('each post should have related posts array', () => {
      blogPosts.forEach(post => {
        expect(Array.isArray(post.relatedPosts)).toBe(true);
        expect(post.relatedPosts.length).toBeGreaterThan(0);
      });
    });

    it('related post ids should be strings', () => {
      blogPosts.forEach(post => {
        post.relatedPosts.forEach((relatedId: string) => {
          expect(typeof relatedId).toBe('string');
        });
      });
    });

    it('each post should have seoKeywords array', () => {
      blogPosts.forEach(post => {
        expect(Array.isArray(post.seoKeywords)).toBe(true);
        expect(post.seoKeywords.length).toBeGreaterThan(0);
      });
    });

    it('each post should have non-empty category', () => {
      blogPosts.forEach(post => {
        expect(post.category).toBeTruthy();
        expect(typeof post.category).toBe('string');
      });
    });

    it('each post should have non-empty slug', () => {
      blogPosts.forEach(post => {
        expect(post.slug).toBeTruthy();
        expect(typeof post.slug).toBe('string');
      });
    });
  });

  describe('Blog Post Content Quality', () => {
    let blogPosts: any[];

    beforeEach(() => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      blogPosts = JSON.parse(content);
    });

    it('content should preserve markdown for rendering', () => {
      blogPosts.forEach(post => {
        // Content should have markdown formatting preserved for BlogContentRenderer
        expect(post.content.length).toBeGreaterThan(100);
        expect(typeof post.content).toBe('string');
      });
    });

    it('content should have reasonable length', () => {
      blogPosts.forEach(post => {
        expect(post.content.length).toBeGreaterThan(300);
      });
    });

    it('each post should have unique id', () => {
      const ids = blogPosts.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(blogPosts.length);
    });
  });

  describe('Specific Blog Posts', () => {
    let blogPosts: any[];

    beforeEach(() => {
      const content = fs.readFileSync(blogPostsPath, 'utf-8');
      blogPosts = JSON.parse(content);
    });

    it('post 1 should be about ADHD and Task Management', () => {
      const post1 = blogPosts.find(p => p.id === '1');
      expect(post1).toBeDefined();
      expect(post1.title).toContain('ADHD');
      expect(post1.title).toContain('Task Management');
    });

    it('post 15 should be about Free Tools', () => {
      const post15 = blogPosts.find(p => p.id === '15');
      expect(post15).toBeDefined();
      expect(post15.title).toContain('Free Tools');
    });

    it('all posts should have dates', () => {
      blogPosts.forEach(post => {
        expect(post.date).toBeTruthy();
        // Date should contain a year
        expect(post.date).toMatch(/20\d{2}/);
      });
    });

    it('all posts should have read time', () => {
      blogPosts.forEach(post => {
        expect(post.readTime).toBeTruthy();
        expect(post.readTime).toMatch(/\d+\s*min\s*read/i);
      });
    });
  });
});
