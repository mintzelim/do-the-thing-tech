import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  primaryEntity?: string;
  secondaryEntities?: string[];
  seoKeywords: string[];
  sources: Array<{ title: string; url: string }>;
  relatedPosts: string[];
  content: string;
  slug: string;
};

let cachedPosts: BlogPost[] | null = null;

/**
 * Load blog posts from the generated JSON file
 */
export function loadBlogPosts(): BlogPost[] {
  if (cachedPosts !== null) {
    return cachedPosts;
  }

  const blogPostsPath = path.join(__dirname, "../client/public/blog-posts.json");
  
  if (!fs.existsSync(blogPostsPath)) {
    console.warn(`Blog posts file not found at ${blogPostsPath}`);
    return [];
  }

  try {
    const content = fs.readFileSync(blogPostsPath, "utf-8");
    cachedPosts = JSON.parse(content);
    return cachedPosts as BlogPost[];
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

/**
 * Find a blog post by slug
 */
export function findBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * Generate JSON-LD BlogPosting schema for a blog post
 */
function generateBlogPostSchema(post: BlogPost, baseUrl: string): string {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const dateObj = new Date(post.date);
  const isoDate = dateObj.toISOString();

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/og-image.png`,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: "DoTheThing",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DoTheThing",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.seoKeywords.join(", "),
    articleSection: post.category,
  };

  // Add primaryEntity if available
  if (post.primaryEntity) {
    schema.about = {
      "@type": "Thing",
      name: post.primaryEntity,
    };
  }

  // Add secondaryEntities if available
  if (post.secondaryEntities && post.secondaryEntities.length > 0) {
    schema.mentions = post.secondaryEntities.map((entity: string) => ({
      "@type": "Thing",
      name: entity,
    }));
  }

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD BreadcrumbList schema for navigation
 */
function generateBreadcrumbSchema(post: BlogPost, baseUrl: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };

  return JSON.stringify(schema);
}

/**
 * Generate FAQ schema for specific high-intent blog posts
 */
function generateFAQSchema(slug: string): string | null {
  const faqData: { [key: string]: Array<{ question: string; answer: string }> } = {
    "free-tools-2026": [
      {
        question: "What are the best free ADHD task management tools in 2026?",
        answer: "The best free ADHD tools include Todoist (task management), Microsoft To Do (daily commitment lists), Forest (focus timer), and Focusmate (body doubling accountability). Choose 2-3 tools that work together rather than collecting many."
      },
      {
        question: "Can I use free tools instead of paid ADHD apps?",
        answer: "Yes, free tools are enough. A two or three-tool system beats a paid stack of twelve. Free tools like Todoist, Google Calendar, and Forest have all the features an ADHD brain needs without the cost or complexity."
      },
      {
        question: "How do I avoid tool overload with ADHD?",
        answer: "Pick 2-3 tools maximum. Research shows people switch between apps over 1000 times per day. For ADHD brains, each switch is a potential exit from focus. Simpler systems get used more consistently."
      },
      {
        question: "What should I use after DoTheThing breaks down my task?",
        answer: "After DoTheThing breaks down a task, use Todoist or Microsoft To Do to store the sub-steps. Then add a focus timer (Forest, Be Focused) for work sessions and an accountability tool (Focusmate) if needed."
      }
    ],
    "breaking-down-big-tasks": [
      {
        question: "Why is task paralysis so common with ADHD?",
        answer: "Task paralysis happens because the brain sees the entire project as one overwhelming thing. ADHD brains struggle with executive function, making it hard to break down big tasks into manageable steps. This is not a willpower problem—it is a brain problem."
      },
      {
        question: "How do I break down a big task into smaller steps?",
        answer: "Break tasks into micro-steps small enough that you can start without thinking. Use the two-minute rule: if a step takes longer than 2 minutes to explain, it is still too big. Each step should be specific and actionable."
      },
      {
        question: "What is the best way to estimate time for ADHD tasks?",
        answer: "ADHD brains are notoriously bad at time estimation. Use realistic time estimates and add a buffer (usually 1.5x your initial guess). Track actual time spent to improve future estimates. Tools like DoTheThing help by breaking down tasks and allowing focus-level adjustments."
      },
      {
        question: "How does AI help with task breakdown for ADHD?",
        answer: "AI can instantly break down overwhelming tasks into micro-steps, removing the executive function burden. It also suggests realistic time estimates based on complexity and helps you identify which steps can be done in focused work sessions."
      }
    ],
    "executive-dysfunction-vs-task-paralysis": [
      {
        question: "What is the difference between executive dysfunction and task paralysis?",
        answer: "Executive dysfunction is a broader ADHD symptom affecting planning, organization, and decision-making. Task paralysis is when you cannot start a task even though you want to. Executive dysfunction causes task paralysis, but not all task paralysis comes from executive dysfunction."
      },
      {
        question: "How do I know if I have executive dysfunction?",
        answer: "Signs include difficulty starting tasks, trouble organizing thoughts, poor time management, decision paralysis, and struggling to prioritize. If these are chronic patterns, you may have executive dysfunction related to ADHD."
      },
      {
        question: "What is the best way to overcome task paralysis?",
        answer: "Remove the need to decide by breaking tasks into micro-steps. Use external accountability (body doubling, Focusmate). Start with the smallest possible first step. Set a timer for just 5 minutes. These strategies bypass the executive function bottleneck."
      },
      {
        question: "Can task breakdown tools help with executive dysfunction?",
        answer: "Yes. Tools like DoTheThing externalize the planning process, removing the executive function burden. By breaking down tasks for you, they eliminate the hardest part—deciding where to start."
      }
    ],
    "adhd-morning-routine-no-motivation-1": [
      {
        question: "Why do I have no motivation in the morning with ADHD?",
        answer: "Low morning motivation in ADHD is neurological, not laziness. ADHD brains have disrupted dopamine signalling in the reward pathway, combined with a delayed circadian rhythm affecting up to 78% of adults with ADHD. Mornings hit when your brain's executive systems are at their lowest point."
      },
      {
        question: "What is the Minimum Viable Morning for ADHD?",
        answer: "The Minimum Viable Morning is a three-step floor routine you can complete in under 10 minutes on your worst days: one physical cue to break body inertia, one dopamine on-ramp to start your reward system, and one task named for the day. It is not your full routine—it is the minimum that still counts as a win."
      },
      {
        question: "How do I get out of bed with ADHD when I have no energy?",
        answer: "Skip willpower entirely. Reduce the activation cost: put your first dopamine on-ramp (a playlist, podcast, or coffee) within arm's reach of the bed before you sleep. The goal is not to feel ready—it is to do one physical action before your brain has time to negotiate. Sitting up counts. Feet on the floor counts."
      },
      {
        question: "Does motivation come before or after action with ADHD?",
        answer: "After. Motivation in neurotypical models is treated as a prerequisite for action. For ADHD brains, dopamine is released in response to movement and task initiation, not before it. Action is the on-ramp, not the destination."
      }
    ],
    "time-blindness-in-adhd": [
      {
        question: "What is time blindness in ADHD?",
        answer: "Time blindness is the ADHD brain's impaired ability to sense how much time has passed and estimate how long tasks will take. It stems from reduced activity in the prefrontal cortex and cerebellum. Around 75% of people with ADHD experience it daily."
      },
      {
        question: "Why does ADHD cause time blindness?",
        answer: "ADHD reduces activity in the prefrontal cortex, cerebellum, and left inferior parietal lobes, all of which handle time perception and planning. Dopamine irregularities also impair the brain's internal timestamping system, making time estimation structurally unreliable."
      },
      {
        question: "What is the now/not now model of ADHD time perception?",
        answer: "Developed by Dr. Russell Barkley, the now/not now model describes how ADHD brains experience time in only two categories: events happening right now, and everything else. Future deadlines stay in the 'not now' category until they become immediate, regardless of importance."
      },
      {
        question: "How does the multiply-by-2 rule help with time blindness?",
        answer: "Whatever time you estimate a task will take, double it before scheduling. Because ADHD brains structurally underestimate duration, the doubled estimate tends to land closer to reality. Pair it with a 10-minute buffer at the end of any task that precedes an appointment."
      }
    ],
    "neurodivergent-productivity-7-tactics": [
      {
        question: "What is the difference between executive dysfunction and laziness?",
        answer: "Executive dysfunction is a neurological bottleneck affecting planning, sequencing, and task initiation. Laziness is a choice to avoid effort. Executive dysfunction is involuntary—your brain literally cannot generate the signal to start, regardless of motivation or desire."
      },
      {
        question: "Why does shrinking tasks help with neurodivergent productivity?",
        answer: "Task initiation is the bottleneck, not task completion. A neurodivergent brain staring at a large task sees an invisible 47-step process. When you shrink the entry point to under 90 seconds, your brain's threat-detection system does not activate, making it possible to begin."
      },
      {
        question: "What is rejection sensitive dysphoria (RSD) in ADHD?",
        answer: "RSD is an intense emotional sensitivity to perceived or actual rejection, criticism, or failure. For neurodivergent adults, the shame spiral after freezing is often worse than the freeze itself. Naming what is happening interrupts the shame loop and creates a reset moment."
      },
      {
        question: "How do I choose which neurodivergent productivity strategy to use?",
        answer: "Start with one or two strategies based on where you get stuck most: task initiation, emotional weight, or decision paralysis. Rotate strategies when they stop working. Sustainability beats intensity—a strategy you use consistently beats a perfect system you abandon."
      }
    ],
    "best-tools-for-adhd-task-management": [
      {
        question: "What are the top 5 free tools for ADHD task management in 2026?",
        answer: "The top 5 are Todoist (frictionless quick capture), Microsoft To Do (My Day commitment list), Google Tasks (zero context switch), Forest (visual dopamine reward), and Focusmate (body doubling accountability). Choose 2-3 that match your workflow."
      },
      {
        question: "How do I avoid tool overload with ADHD task management?",
        answer: "Pick 2-3 tools maximum. Research shows people switch between apps over 1000 times per day. For ADHD brains, each switch is a potential exit from focus. A simple system you use consistently beats a complex system you abandon."
      },
      {
        question: "What should I look for in an ADHD task management tool?",
        answer: "Look for frictionless capture (quick entry without setup), visual progress (dopamine rewards), external structure (removes decision-making), and low context-switching (integrates with tools you already use). Avoid tools requiring extensive customization before use."
      },
      {
        question: "Can I use the same tool for task breakdown and task management?",
        answer: "Not ideally. Task breakdown tools (like DoTheThing) excel at planning. Task management tools (like Todoist) excel at tracking and execution. Breaking down in one tool, then moving to a management tool, creates a workflow that matches how ADHD brains actually work."
      }
    ],
    "how-to-break-down-tasks-adhd": [
      {
        question: "What are real user stories for ADHD task breakdown?",
        answer: "Real examples include a project manager who breaks a campaign launch into 47 micro-steps and completes it on time, a student who breaks an essay into research, outline, draft, and edit phases with time buffers, and a parent who breaks vacation planning into separate tasks for flights, hotels, and activities."
      },
      {
        question: "How does DoTheThing break down tasks differently than manual methods?",
        answer: "DoTheThing uses AI to instantly generate micro-steps with realistic time estimates based on your focus level (hyperfocused, normal, or distracted). Manual breakdown requires executive function you may not have available. Automation removes the hardest part—planning itself."
      },
      {
        question: "What is the difference between task breakdown sizes in DoTheThing?",
        answer: "Tiny Steps (2-5 minute tasks) for executive dysfunction or low motivation days. Balanced (5-15 minute tasks) for typical days. Big Milestones (15-60 minute phases) for hyperfocus sessions or when you need a higher-level view. Choose based on your current brain state."
      },
      {
        question: "How accurate are DoTheThing's time estimates for ADHD brains?",
        answer: "DoTheThing's estimates include a buffer for ADHD time blindness and executive dysfunction. They are calibrated to be realistic for neurodivergent brains, not neurotypical ones. The multiply-by-2 rule still applies if you want additional safety margin."
      }
    ]
  };

  if (!faqData[slug]) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData[slug].map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Inject blog post metadata and schema markup into HTML template
 * Replaces default site-wide metadata with post-specific metadata
 */
export function injectBlogMetadata(
  htmlTemplate: string,
  post: BlogPost,
  baseUrl: string = "https://dothething.tech"
): string {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const keywords = post.seoKeywords.join(", ");
  const ogImage = `${baseUrl}/og-image.png`;
  
  // Generate schema markup
  const blogPostSchema = generateBlogPostSchema(post, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(post, baseUrl);
  const faqSchema = generateFAQSchema(post.slug);

  let result = htmlTemplate;
  
  // Replace title tag
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(post.title)} | DoTheThing Blog</title>`
  );
  
  // Replace description meta tag
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(post.excerpt)}" />`
  );
  
  // Replace keywords meta tag
  result = result.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`
  );

  // Replace canonical URL (remove site-wide, add post-specific)
  result = result.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${postUrl}" />`
  );

  // Replace Open Graph tags (remove site-wide, add post-specific)
  result = result.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="article" />`
  );
  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${postUrl}" />`
  );
  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(post.title)}" />`
  );
  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(post.excerpt)}" />`
  );
  result = result.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`
  );

  // Add article-specific Open Graph tags if not present
  if (!result.includes('property="article:published_time"')) {
    const articleOgTags = `    <meta property="article:published_time" content="${new Date(post.date).toISOString()}" />
    <meta property="article:section" content="${escapeHtml(post.category)}" />
    `;
    result = result.replace(/<meta property="og:image"[^>]*\/>/, `$&\n${articleOgTags}`);
  }

  // Replace Twitter Card tags (remove site-wide, add post-specific)
  result = result.replace(
    /<meta name="twitter:card" content="[^"]*" \/>/,
    `<meta name="twitter:card" content="summary_large_image" />`
  );
  result = result.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${postUrl}" />`
  );
  result = result.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(post.title)}" />`
  );
  result = result.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />`
  );
  result = result.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  );

  // Inject schema markup before closing </head>
  let schemaMarkup = `
    <script type="application/ld+json">${blogPostSchema}</script>
    <script type="application/ld+json">${breadcrumbSchema}</script>
  `;
  
  // Add FAQ schema if available for this post
  if (faqSchema) {
    schemaMarkup += `
    <script type="application/ld+json">${faqSchema}</script>
  `;
  }
  
  result = result.replace(
    /<\/head>/,
    `${schemaMarkup}</head>`
  );

  return result;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
