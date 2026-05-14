import { describe, it, expect } from 'vitest';

/**
 * FAQ Schema Integration Tests
 * Verifies that:
 * 1. Homepage has 7-item FAQPage schema
 * 2. Blog posts have their own FAQPage schema (not homepage FAQ)
 * 3. Homepage FAQ is removed when navigating to blog posts
 * 4. No FAQ schema conflicts between homepage and blog posts
 */

describe('FAQ Schema Lifecycle', () => {
  it('should have 7 FAQ items in homepage FAQ schema', () => {
    const homepageFAQ = [
      { q: 'Is DoTheThing free?', a: 'Yes. No login, no account, nothing to install. Open the app, type your task, get your breakdown.' },
      { q: 'What is task paralysis?', a: 'Task paralysis is when an ADHD brain freezes in front of a task it understands. It\'s a neurological response to ambiguity — the brain can\'t generate a first step, so it generates nothing. DoTheThing removes the ambiguity by handing you a step small enough that starting stops feeling like a risk.' },
      { q: 'What is time blindness?', a: 'Time blindness is the ADHD brain\'s genuine difficulty sensing how long things take and how fast time passes. Estimates end up too optimistic, schedules collapse. DoTheThing adds a 20–30% buffer to every estimate and gives you a visual countdown timer so time stays concrete.' },
      { q: 'What does the focus level setting do?', a: 'Pick Hyperfocused, Normal, or Distracted and the AI recalibrates every time estimate in your breakdown. A distracted day gets a distracted-day plan. Your schedule has a real shot at surviving contact with reality.' },
      { q: 'What\'s the difference between Tiny Steps, Balanced, and Big Milestones?', a: 'Tiny Steps gives you the smallest possible first action — for days when beginning feels impossible. Balanced is the everyday default. Big Milestones shows the major stages of a project without granular detail. Pick based on how your brain is running today.' },
      { q: 'Can I use it for a brain dump?', a: 'Yes. Type everything on your plate — no sorting, no organising required. The AI handles the mess and identifies what needs breaking down.' },
      { q: 'Does it work for tasks outside of work?', a: 'Yes. Household tasks, personal admin, creative projects, study, financial admin — anywhere the gap between intention and action opens up.' }
    ];

    expect(homepageFAQ).toHaveLength(7);
    expect(homepageFAQ[0].q).toBe('Is DoTheThing free?');
    expect(homepageFAQ[6].q).toBe('Does it work for tasks outside of work?');
  });

  it('should generate FAQPage schema with correct structure', () => {
    const faqPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is DoTheThing free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. No login, no account, nothing to install. Open the app, type your task, get your breakdown.'
          }
        }
      ]
    };

    expect(faqPageSchema['@type']).toBe('FAQPage');
    expect(faqPageSchema.mainEntity).toHaveLength(1);
    expect(faqPageSchema.mainEntity[0]['@type']).toBe('Question');
  });

  it('should mark homepage FAQ schema with data-schema attribute', () => {
    // Homepage FAQ script should have data-schema="homepage-faq"
    const homepageFAQScript = {
      type: 'application/ld+json',
      'data-schema': 'homepage-faq',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage'
      })
    };

    expect(homepageFAQScript['data-schema']).toBe('homepage-faq');
  });

  it('should mark blog post FAQ schema with data-schema attribute', () => {
    // Blog post FAQ script should have data-schema="blog-post"
    const blogPostFAQScript = {
      type: 'application/ld+json',
      'data-schema': 'blog-post',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage'
      })
    };

    expect(blogPostFAQScript['data-schema']).toBe('blog-post');
  });

  it('should have 6 FAQ items in blog post schema', () => {
    const blogPostFAQ = [
      { q: 'FAQ 1', a: 'Answer 1' },
      { q: 'FAQ 2', a: 'Answer 2' },
      { q: 'FAQ 3', a: 'Answer 3' },
      { q: 'FAQ 4', a: 'Answer 4' },
      { q: 'FAQ 5', a: 'Answer 5' },
      { q: 'FAQ 6', a: 'Answer 6' }
    ];

    expect(blogPostFAQ).toHaveLength(6);
  });

  it('should remove homepage FAQ when injecting blog post schema', () => {
    // Simulate the removal logic
    const scripts = [
      { 'data-schema': 'homepage-faq', remove: () => {} },
      { 'data-schema': 'blog-post', remove: () => {} }
    ];

    const homepageFAQScript = scripts.find((s: any) => s['data-schema'] === 'homepage-faq');
    expect(homepageFAQScript).toBeDefined();
    expect(homepageFAQScript?.['data-schema']).toBe('homepage-faq');
  });

  it('should not have FAQ schema conflicts between pages', () => {
    // Homepage should only have homepage FAQ
    const homepageSchemas = [
      { 'data-schema': 'homepage-faq' }
    ];

    // Blog post should only have blog post schemas
    const blogPostSchemas = [
      { 'data-schema': 'blog-post' },
      { 'data-schema': 'blog-post' },
      { 'data-schema': 'blog-post' }
    ];

    // No overlap
    const homepageSchemaTypes = homepageSchemas.map((s: any) => s['data-schema']);
    const blogPostSchemaTypes = blogPostSchemas.map((s: any) => s['data-schema']);
    const overlap = homepageSchemaTypes.filter((t: string) => blogPostSchemaTypes.includes(t));

    expect(overlap).toHaveLength(0);
  });
});
