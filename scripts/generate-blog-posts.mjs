import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../blog');
const outputFile = path.join(__dirname, '../client/public/blog-posts.json');

/**
 * Parse YAML frontmatter from markdown content
 * Returns { frontmatter: object, content: string }
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found in markdown file');
  }

  const [, frontmatterStr, markdownContent] = match;
  
  try {
    const frontmatter = YAML.load(frontmatterStr) || {};
    return {
      frontmatter,
      content: markdownContent.trim()
    };
  } catch (error) {
    throw new Error(`Failed to parse YAML: ${error.message}`);
  }
}

/**
 * Preserve markdown content (keep markdown formatting for rendering)
 */
function preserveMarkdown(markdown) {
  // Just trim whitespace, keep all markdown formatting
  return markdown.trim();
}

/**
 * Generate blog posts from markdown files
 */
function generateBlogPosts() {
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md') && f !== 'TEMPLATE.md')
    .sort();

  const blogPosts = [];

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const { frontmatter, content: markdown } = parseFrontmatter(content);
      
      // Preserve markdown content with formatting
      const plainContent = preserveMarkdown(markdown);

      // Ensure arrays are properly formatted
      const seoKeywords = Array.isArray(frontmatter.seoKeywords) 
        ? frontmatter.seoKeywords 
        : [];
      
      const sources = Array.isArray(frontmatter.sources) 
        ? frontmatter.sources.map(source => ({
            title: source.title || '',
            url: source.url || ''
          }))
        : [];
      
      const relatedPosts = Array.isArray(frontmatter.relatedPosts)
        ? frontmatter.relatedPosts.map(String)
        : [];

      const post = {
        id: String(frontmatter.id),
        title: frontmatter.title || '',
        excerpt: frontmatter.excerpt || '',
        date: frontmatter.date || '',
        readTime: frontmatter.readTime || '',
        category: frontmatter.category || '',
        seoKeywords,
        sources,
        relatedPosts,
        content: plainContent,
        slug: file.replace(/^\d+-/, '').replace('.md', '')
      };

      blogPosts.push(post);
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
      process.exit(1);
    }
  }

  return blogPosts;
}

/**
 * Main function
 */
function main() {
  try {
    console.log('📝 Generating blog posts from markdown files...');
    
    const blogPosts = generateBlogPosts();
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2));
    
    console.log(`✅ Successfully generated blog-posts.json with ${blogPosts.length} posts`);
    console.log(`📍 Output: ${outputFile}`);
    
    // Print summary
    console.log('\n📋 Blog Posts:');
    blogPosts.forEach(post => {
      console.log(`  - [${post.id}] ${post.title}`);
    });
  } catch (error) {
    console.log('❌ Error generating blog posts:', error);
    process.exit(1);
  }
}

main();
