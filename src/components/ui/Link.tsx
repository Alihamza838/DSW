import * as React from "react";

export function navigate(href: string) {
  window.history.pushState({}, "", href);
  const popStateEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popStateEvent);
  window.scrollTo(0, 0);
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  itemProp?: string;
  key?: React.Key;
  [key: string]: any;
}

// Global prefetch registry to avoid double fetching
const prefetchedUrls = new Set<string>();

function prefetchRoute(href: string) {
  if (!href || prefetchedUrls.has(href) || href.startsWith("http")) return;
  prefetchedUrls.add(href);

  // Trigger link rel=prefetch if supported or pre-warm router caches
  try {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  } catch (err) {
    // Ignore non-critical prefetch failures
  }
}

export function Link({ href, children, onClick, onMouseEnter, onTouchStart, className, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let standard browser behaviors happen (e.g. command/control click for new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    navigate(href);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    prefetchRoute(href);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    prefetchRoute(href);
    if (onTouchStart) onTouchStart(e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
