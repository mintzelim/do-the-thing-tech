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
    <nav className="blog-breadcrumb" aria-label="Breadcrumb">
      <ol className="blog-breadcrumb-list">
        {items.map((item, index) => (
          <li className="blog-breadcrumb-item" key={item.href || item.label}>
            {item.href ? (
              <>
                <Link className="blog-breadcrumb-link" href={item.href}>{item.label}</Link>
                {index < items.length - 1 && <span className="blog-breadcrumb-separator" aria-hidden="true">/</span>}
              </>
            ) : (
              <span className="blog-breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
