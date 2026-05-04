import { Link } from "wouter";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        marginBottom: "24px",
        fontSize: "12px",
        fontFamily: "'VT323', monospace",
      }}
    >
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {item.href ? (
              <>
                <Link
                  href={item.href}
                  style={{
                    color: "var(--pixel-accent)",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.textDecoration = "none";
                  }}
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span style={{ color: "var(--pixel-text-light)" }}>/</span>
                )}
              </>
            ) : (
              <>
                <span style={{ color: "var(--pixel-text)" }}>{item.label}</span>
                {index < items.length - 1 && (
                  <span style={{ color: "var(--pixel-text-light)" }}>/</span>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
