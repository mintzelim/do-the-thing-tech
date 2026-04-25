import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Blog Metadata Validation Tests
 * 
 * These tests validate that all 15 blog posts have:
 * - Proper source citations (sources array with title and url)
 * - Related post backlinks (relatedPosts array with valid post IDs)
 * - Consistent structure and required fields
 */

describe('Blog Post Metadata', () => {
  // Read the Blog.tsx file and extract blog posts data
  const blogFilePath = path.join(process.cwd(), 'client/src/pages/Blog.tsx');
  const blogFileContent = fs.readFileSync(blogFilePath, 'utf-8');

  // Parse blog posts from the file (simplified extraction)
  const blogPostsMatch = blogFileContent.match(/const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
  if (!blogPostsMatch) {
    throw new Error('Could not find blogPosts array in Blog.tsx');
  }

  describe('All 15 Blog Posts Exist', () => {
    it('should have 15 blog posts defined', () => {
      const postIdMatches = blogFileContent.match(/id: '(\d+)'/g) || [];
      expect(postIdMatches.length).toBe(15);
      
      // Verify all IDs from 1-15 are present
      const ids = postIdMatches.map(m => m.match(/\d+/)![0]).map(Number);
      for (let i = 1; i <= 15; i++) {
        expect(ids).toContain(i);
      }
    });
  });

  describe('Blog Posts Have Sources (Citations)', () => {
    it('post 1 has sources', () => {
      expect(blogFileContent).toMatch(/id: '1'[\s\S]*?sources: \[\s*\{ title:.*?url:.*?\},[\s\S]*?\{ title:.*?url:.*?\},[\s\S]*?\{ title:.*?url:.*?\}\s*\]/);
    });

    it('post 7 has sources', () => {
      expect(blogFileContent).toMatch(/id: '7'[\s\S]*?sources: \[\s*\{ title:.*?American Psychological Association.*?url:.*?\},[\s\S]*?\{ title:.*?Temporal Motivation Theory.*?url:.*?\},[\s\S]*?\{ title:.*?Emotion Regulation.*?url:.*?\}\s*\]/);
    });

    it('post 8 has sources', () => {
      expect(blogFileContent).toMatch(/id: '8'[\s\S]*?sources: \[\s*\{ title:.*?American Psychological Association.*?Remote Work.*?url:.*?\},[\s\S]*?\{ title:.*?Harvard Business Review.*?url:.*?\},[\s\S]*?\{ title:.*?Society for Human Resource Management.*?url:.*?\}\s*\]/);
    });

    it('post 9 has sources', () => {
      expect(blogFileContent).toMatch(/id: '9'[\s\S]*?sources: \[\s*\{ title:.*?Psychology Today.*?Perfectionism.*?url:.*?\},[\s\S]*?\{ title:.*?Journal of Attention Disorders.*?url:.*?\},[\s\S]*?\{ title:.*?Cognitive Behavioral Therapy.*?url:.*?\}\s*\]/);
    });

    it('post 10 has sources', () => {
      expect(blogFileContent).toMatch(/id: '10'[\s\S]*?sources: \[\s*\{ title:.*?Psychology Today.*?Relationships.*?url:.*?\},[\s\S]*?\{ title:.*?National Institutes of Health.*?url:.*?\},[\s\S]*?\{ title:.*?Couples Therapy.*?url:.*?\}\s*\]/);
    });

    it('post 11 has sources', () => {
      expect(blogFileContent).toMatch(/id: '11'[\s\S]*?sources: \[\s*\{ title:.*?Americans with Disabilities Act.*?url:.*?\},[\s\S]*?\{ title:.*?CHADD.*?url:.*?\},[\s\S]*?\{ title:.*?Harvard Business Review.*?url:.*?\}\s*\]/);
    });

    it('post 12 has sources', () => {
      expect(blogFileContent).toMatch(/id: '12'[\s\S]*?sources: \[\s*\{ title:.*?National Sleep Foundation.*?url:.*?\},[\s\S]*?\{ title:.*?Mayo Clinic.*?url:.*?\},[\s\S]*?\{ title:.*?Sleep Research Society.*?url:.*?\}\s*\]/);
    });

    it('post 13 has sources', () => {
      expect(blogFileContent).toMatch(/id: '13'[\s\S]*?sources: \[\s*\{ title:.*?Financial Health Network.*?url:.*?\},[\s\S]*?\{ title:.*?National Endowment for Financial Education.*?url:.*?\},[\s\S]*?\{ title:.*?YNAB.*?url:.*?\}\s*\]/);
    });

    it('post 14 has sources', () => {
      expect(blogFileContent).toMatch(/id: '14'[\s\S]*?sources: \[\s*\{ title:.*?Psychology Today.*?Creativity.*?url:.*?\},[\s\S]*?\{ title:.*?Creative Minds Research.*?url:.*?\},[\s\S]*?\{ title:.*?Thrive Global.*?url:.*?\}\s*\]/);
    });

    it('post 15 has sources', () => {
      expect(blogFileContent).toMatch(/id: '15'[\s\S]*?sources: \[\s*\{ title:.*?Todoist.*?url:.*?\},[\s\S]*?\{ title:.*?Notion.*?url:.*?\},[\s\S]*?\{ title:.*?ADHD Tools and Apps Directory.*?url:.*?\}\s*\]/);
    });
  });

  describe('Blog Posts Have Related Posts (Backlinks)', () => {
    it('post 1 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '1'[\s\S]*?relatedPosts: \['2', '4', '6'\]/);
    });

    it('post 7 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '7'[\s\S]*?relatedPosts: \['1', '3', '4'\]/);
    });

    it('post 8 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '8'[\s\S]*?relatedPosts: \['2', '5', '11'\]/);
    });

    it('post 9 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '9'[\s\S]*?relatedPosts: \['3', '4', '7'\]/);
    });

    it('post 10 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '10'[\s\S]*?relatedPosts: \['1', '6', '11'\]/);
    });

    it('post 11 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '11'[\s\S]*?relatedPosts: \['2', '8', '10'\]/);
    });

    it('post 12 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '12'[\s\S]*?relatedPosts: \['1', '6', '4'\]/);
    });

    it('post 13 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '13'[\s\S]*?relatedPosts: \['2', '7', '11'\]/);
    });

    it('post 14 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '14'[\s\S]*?relatedPosts: \['1', '5', '11'\]/);
    });

    it('post 15 has related posts', () => {
      expect(blogFileContent).toMatch(/id: '15'[\s\S]*?relatedPosts: \['3', '5', '8'\]/);
    });
  });

  describe('Source URLs are Valid', () => {
    it('all source URLs start with https://', () => {
      const urlMatches = blogFileContent.match(/url: '(https?:\/\/[^']+)'/g) || [];
      expect(urlMatches.length).toBeGreaterThan(0);
      
      urlMatches.forEach(urlMatch => {
        const url = urlMatch.replace(/url: '/, '').replace(/'$/, '');
        expect(url).toMatch(/^https?:\/\//);
      });
    });

    it('source URLs are not empty', () => {
      const urlMatches = blogFileContent.match(/url: '([^']+)'/g) || [];
      urlMatches.forEach(urlMatch => {
        const url = urlMatch.replace(/url: '/, '').replace(/'$/, '');
        expect(url.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Related Post IDs are Valid', () => {
    it('all related post IDs reference existing posts', () => {
      const relatedPostMatches = blogFileContent.match(/relatedPosts: \[([^\]]+)\]/g) || [];
      
      relatedPostMatches.forEach(match => {
        const idsStr = match.replace(/relatedPosts: \[/, '').replace(/\]$/, '');
        const ids = idsStr.match(/'(\d+)'/g) || [];
        
        ids.forEach(idMatch => {
          const id = idMatch.replace(/'/g, '');
          const idNum = parseInt(id);
          expect(idNum).toBeGreaterThanOrEqual(1);
          expect(idNum).toBeLessThanOrEqual(15);
        });
      });
    });
  });

  describe('Blog Structure Consistency', () => {
    it('all posts have title, excerpt, content, date, readTime, category, seoKeywords', () => {
      const requiredFields = ['title', 'excerpt', 'content', 'date', 'readTime', 'category', 'seoKeywords'];
      
      for (let i = 1; i <= 15; i++) {
        const postPattern = new RegExp(`id: '${i}'[\\s\\S]*?content:`, 'g');
        expect(blogFileContent).toMatch(postPattern);
        
        requiredFields.forEach(field => {
          const fieldPattern = new RegExp(`id: '${i}'[\\s\\S]*?${field}:`);
          expect(blogFileContent).toMatch(fieldPattern);
        });
      }
    });

    it('posts 1-15 all have sources and relatedPosts arrays', () => {
      for (let i = 1; i <= 15; i++) {
        const sourcesPattern = new RegExp(`id: '${i}'[\\s\\S]*?sources: \\[`);
        const relatedPattern = new RegExp(`id: '${i}'[\\s\\S]*?relatedPosts: \\[`);
        
        expect(blogFileContent).toMatch(sourcesPattern);
        expect(blogFileContent).toMatch(relatedPattern);
      }
    });
  });
});
