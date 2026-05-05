import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp, Search, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FAQ {
  q: string;
  a: string;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  slug: string;
  faq: FAQ[];
}

export default function FAQPage() {
  const [faqData, setFaqData] = React.useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/blog-posts.json')
      .then((res) => res.json())
      .then((data) => setFaqData(data))
      .catch((err) => console.error('Failed to load FAQ data:', err));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(faqData.map((post) => post.category));
    return ['All', ...Array.from(cats).sort()];
  }, [faqData]);

  // Filter and search FAQs
  const filteredData = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map((post) => ({
        ...post,
        faq: post.faq.filter(
          (item) =>
            item.q.toLowerCase().includes(query) ||
            item.a.toLowerCase().includes(query)
        ),
      }));
      filtered = filtered.filter((post) => post.faq.length > 0);
    }

    return filtered;
  }, [faqData, searchQuery, selectedCategory]);

  const toggleFAQ = (postId: string, faqIndex: number) => {
    const key = `${postId}-${faqIndex}`;
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedFAQs(newExpanded);
  };

  const copyLinkToClipboard = (anchorId: string) => {
    const url = `${window.location.origin}/faq#${anchorId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(anchorId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalFAQs = faqData.reduce((sum, post) => sum + post.faq.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-pixel">
            FAQ Hub
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {totalFAQs} questions answered across {faqData.length} blog posts
          </p>
          <p className="text-base text-muted-foreground">
            Search or browse FAQs by category to find answers about ADHD task
            management, productivity, and neurodivergent strategies. Click the # icon to copy direct links to any FAQ.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Results */}
        <div className="space-y-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No FAQs found matching your search.
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredData.map((post) => (
              <div key={post.id} className="border border-border rounded-lg p-6">
                {/* Post Header */}
                <div className="mb-4">
                  <Link href={`/blog/${post.slug}`}>
                    <a className="hover:underline">
                      <h2 className="text-xl font-bold text-accent mb-1">
                        {post.title}
                      </h2>
                    </a>
                  </Link>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {post.category} • {post.faq.length} questions
                  </p>
                </div>

                {/* FAQs */}
                <div className="space-y-3">
                  {post.faq.map((faq, index) => {
                    const key = `${post.id}-${index}`;
                    const anchorId = `faq-${post.id}-${index}`;
                    const isExpanded = expandedFAQs.has(key);
                    const isCopied = copiedId === anchorId;

                    return (
                      <div
                        key={index}
                        id={anchorId}
                        className="border border-border rounded bg-card hover:bg-card/80 transition-colors scroll-mt-20"
                      >
                        <button
                          onClick={() => toggleFAQ(post.id, index)}
                          className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-accent/5 group"
                        >
                          <span className="font-semibold text-sm flex-1 pr-2">
                            {faq.q}
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyLinkToClipboard(anchorId);
                              }}
                              className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent cursor-pointer p-1"
                              title="Copy link to this FAQ"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0 border-t border-border">
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {faq.a}
                            </p>
                            <div className="flex gap-3 mt-3 flex-wrap">
                              <Link href={`/blog/${post.slug}`}>
                                <a className="text-xs text-accent hover:underline inline-block">
                                  Read full post →
                                </a>
                              </Link>
                              <button
                                onClick={() => copyLinkToClipboard(anchorId)}
                                className={`text-xs transition-colors inline-flex items-center gap-1 ${
                                  isCopied
                                    ? 'text-green-600'
                                    : 'text-muted-foreground hover:text-accent'
                                }`}
                              >
                                {isCopied ? '✓ Copied!' : 'Copy link'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Didn't find your answer?
          </p>
          <Button variant="outline" asChild>
            <Link href="/blog">
              <a>Browse all blog posts</a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
