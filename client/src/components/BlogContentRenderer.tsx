import React from 'react';

interface BlogContentRendererProps {
  content: string;
  onInternalLinkClick?: (postId: string) => void;
}

export default function BlogContentRenderer({ content, onInternalLinkClick }: BlogContentRendererProps) {
  // Split content into lines for processing
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines but preserve spacing
    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} style={{ height: '12px' }} />);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="mobile-heading-1" style={{ marginBottom: '16px', marginTop: '16px', fontFamily: "'VT323', monospace" }}>
          {parseInlineMarkdown(line.substring(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="mobile-heading-2" style={{ marginBottom: '12px', marginTop: '12px', fontFamily: "'VT323', monospace" }}>
          {parseInlineMarkdown(line.substring(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="mobile-heading-3" style={{ marginBottom: '8px', marginTop: '8px', fontFamily: "'VT323', monospace" }}>
          {parseInlineMarkdown(line.substring(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`blockquote-${i}`}
          style={{
            borderLeft: '4px solid var(--pixel-accent)',
            paddingLeft: '12px',
            marginLeft: '0',
            marginRight: '0',
            marginBottom: '12px',
            fontStyle: 'italic',
            color: 'var(--pixel-text)',
            fontFamily: "'Noto Sans Mono', monospace",
          }}
        >
          {parseInlineMarkdown(line.substring(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Unordered lists
    if (line.startsWith('- ')) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(
          <li key={`li-${i}`} style={{ marginBottom: '4px' }}>
            {parseInlineMarkdown(lines[i].substring(2))}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ paddingLeft: '24px', marginBottom: '12px', fontFamily: "'Noto Sans Mono', monospace" }}>
          {listItems}
        </ul>
      );
      continue;
    }

    // Ordered lists
    if (/^\d+\. /.test(line)) {
      const listItems: React.ReactNode[] = [];
      let listIndex = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        const match = lines[i].match(/^\d+\. (.+)/);
        if (match) {
          listItems.push(
            <li key={`li-${i}`} style={{ marginBottom: '4px' }}>
              {parseInlineMarkdown(match[1])}
            </li>
          );
        }
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ paddingLeft: '24px', marginBottom: '12px', fontFamily: "'Noto Sans Mono', monospace" }}>
          {listItems}
        </ol>
      );
      continue;
    }

    // Code blocks
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++; // Skip opening ```
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          style={{
            backgroundColor: 'var(--pixel-card-bg)',
            border: '1px solid var(--pixel-border)',
            padding: '12px',
            borderRadius: '4px',
            overflowX: 'auto',
            marginBottom: '12px',
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '11px',
          }}
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Tables
    if (line.includes('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        const cells = lines[i].split('|').map(cell => cell.trim()).filter(cell => cell);
        tableRows.push(cells);
        i++;
      }
      
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${i}`} style={{ overflowX: 'auto', marginBottom: '12px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid var(--pixel-border)',
                fontFamily: "'Noto Sans Mono', monospace",
              }}
            >
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr
                    key={`tr-${rowIndex}`}
                    style={{
                      borderBottom: '1px solid var(--pixel-border)',
                      backgroundColor: rowIndex === 0 ? 'var(--pixel-card-bg)' : 'transparent',
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`td-${rowIndex}-${cellIndex}`}
                        style={{
                          padding: '8px 12px',
                          borderRight: cellIndex < row.length - 1 ? '1px solid var(--pixel-border)' : 'none',
                          fontWeight: rowIndex === 0 ? 'bold' : 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Horizontal rule
    if (line === '---' || line === '***' || line === '___') {
      elements.push(
        <hr
          key={`hr-${i}`}
          style={{
            border: 'none',
            borderTop: '2px solid var(--pixel-border)',
            margin: '16px 0',
          }}
        />
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} style={{ marginBottom: '12px', lineHeight: '1.6', fontFamily: "'Noto Sans Mono', monospace", fontSize: '16px' }}>
        {parseInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div style={{ whiteSpace: 'normal' }}>{elements}</div>;
}

// Parse inline markdown (bold, italic, links, code)
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Combined regex for all inline elements: **bold**, *italic*, [links], `code`
  const inlineRegex = /(\*\*[^\*]+\*\*|\*[^\*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g;
  let match;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const fullMatch = match[0];

    // Bold text
    if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
      parts.push(
        <strong key={`bold-${match.index}`} style={{ fontWeight: 'bold' }}>
          {fullMatch.substring(2, fullMatch.length - 2)}
        </strong>
      );
    }
    // Italic text
    else if (fullMatch.startsWith('*') && fullMatch.endsWith('*')) {
      parts.push(
        <em key={`italic-${match.index}`} style={{ fontStyle: 'italic' }}>
          {fullMatch.substring(1, fullMatch.length - 1)}
        </em>
      );
    }
    // Inline code
    else if (fullMatch.startsWith('`') && fullMatch.endsWith('`')) {
      parts.push(
        <code
          key={`inline-code-${match.index}`}
          style={{
            backgroundColor: 'var(--pixel-card-bg)',
            padding: '2px 4px',
            borderRadius: '2px',
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '0.9em',
          }}
        >
          {fullMatch.substring(1, fullMatch.length - 1)}
        </code>
      );
    }
    // Links
    else if (fullMatch.includes('[')) {
      const linkText = match[2];
      const linkUrl = match[3];

      if (linkUrl.startsWith('post:')) {
        const postId = linkUrl.substring(5);
        parts.push(
          <button
            key={`link-${match.index}`}
            onClick={() => {}}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--pixel-accent)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontFamily: "'Noto Sans Mono', monospace",
              fontSize: 'inherit',
              padding: '0',
              margin: '0',
            }}
          >
            {linkText}
          </button>
        );
      } else {
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--pixel-accent)',
              textDecoration: 'underline',
              fontFamily: "'Noto Sans Mono', monospace",
              fontSize: 'inherit',
            }}
          >
            {linkText} ↗
          </a>
        );
      }
    }

    lastIndex = inlineRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
