import React from 'react';

interface BlogContentRendererProps {
  content: string;
  onInternalLinkClick?: (postId: string) => void;
}

export default function BlogContentRenderer({ content, onInternalLinkClick }: BlogContentRendererProps) {
  // Parse markdown links: [text](url) or [text](post:id)
  const parseContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const linkText = match[1];
      const linkUrl = match[2];

      // Check if it's an internal blog post link (post:id format)
      if (linkUrl.startsWith('post:')) {
        const postId = linkUrl.substring(5);
        parts.push(
          <button
            key={`link-${match.index}`}
            onClick={() => onInternalLinkClick?.(postId)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--pixel-accent)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: '0',
              margin: '0',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
          >
            {linkText}
          </button>
        );
      } else {
        // External link
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--pixel-accent)',
              textDecoration: 'underline',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {linkText} ↗
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
      {parseContent(content)}
    </div>
  );
}
