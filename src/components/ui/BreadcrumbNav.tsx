import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "./Link";
import { storesData } from "../../data/stores";
import { guidesData } from "../../data/guides";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  us: "United States",
  ca: "Canada",
  uk: "United Kingdom",
  au: "Australia",
  pk: "Pakistan",
  in: "India",
  ae: "UAE & Middle East",
};

/**
 * Format raw URL slug into human readable label with entity resolution
 */
function resolveSlugLabel(segment: string, parentSegment?: string): string {
  if (!segment) return "";

  if (parentSegment === "stores") {
    const store = storesData.find((s) => s.slug === segment);
    if (store) return `${store.brand} Policy`;
  }

  if (parentSegment === "blog") {
    const guide = guidesData.find((g) => g.slug === segment);
    if (guide) return guide.title;
  }

  if (parentSegment === "by-country") {
    const countryName = COUNTRY_NAMES[segment.toLowerCase()];
    if (countryName) return countryName;
  }

  if (segment === "stores" || segment === "retail-store" || segment === "retail-stores") return "Store";
  if (segment === "blog") return "Guides & Policy Articles";
  if (segment === "products" || segment === "deals") return "Verified Deals";
  if (segment === "compare") return "Store Comparisons";
  if (segment === "by-country") return "By Country";
  if (segment === "find-return-desk") return "Return Desk Locator";
  if (segment === "return-policies") return "All Policies";
  if (segment === "store-comparisons") return "Comparisons Hub";

  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function BreadcrumbNav({ items: propItems, className = "" }: BreadcrumbNavProps) {
  const [autoItems, setAutoItems] = React.useState<BreadcrumbItem[]>([]);

  const generateAutoBreadcrumbs = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    const generated: BreadcrumbItem[] = [];
    let accumulatedPath = "";

    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const parentSegment = index > 0 ? segments[index - 1] : undefined;
      const label = resolveSlugLabel(segment, parentSegment);

      generated.push({
        label,
        href: accumulatedPath,
      });
    });

    setAutoItems(generated);
  }, []);

  React.useEffect(() => {
    if (propItems && propItems.length > 0) return;

    generateAutoBreadcrumbs();

    const handleLocationChange = () => {
      generateAutoBreadcrumbs();
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [propItems, generateAutoBreadcrumbs]);

  const rawItems = propItems && propItems.length > 0 ? propItems : autoItems;

  // Clean and deduplicate breadcrumb items
  const items = React.useMemo(() => {
    const cleaned: BreadcrumbItem[] = [];
    for (const item of rawItems) {
      if (!item || !item.label) continue;
      let label = item.label.trim();
      const lower = label.toLowerCase();
      // Skip duplicate 'Home' since Home icon/link is always rendered at position 1
      if (lower === "home" || item.href === "/") continue;
      // Sanitize Retail Stores / retail-store labels
      if (lower === "retail stores" || lower === "retail store" || lower === "retail-store" || lower === "retail-stores") {
        label = "Store";
      }
      // Skip consecutive duplicates
      if (cleaned.length > 0 && cleaned[cleaned.length - 1].label.toLowerCase() === label.toLowerCase()) continue;
      cleaned.push({ ...item, label });
    }
    return cleaned;
  }, [rawItems]);

  const domain = "https://dswreturnrefund.com";
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${domain}/`,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `${domain}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`font-sans text-xs text-slate-600 my-3 py-1.5 overflow-x-auto no-scrollbar animate-fade-in ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-1.5 font-medium whitespace-nowrap min-w-max"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1.5"
        >
          <Link
            itemProp="item"
            href="/"
            className="hover:text-red-700 flex items-center gap-1.5 text-slate-600 hover:underline transition-colors group"
          >
            <Home className="h-3.5 w-3.5 text-red-600 group-hover:scale-110 transition-transform shrink-0" />
            <span itemProp="name" className="font-semibold text-slate-800">
              Home
            </span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const position = idx + 2;

          return (
            <li
              key={idx}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span
                  itemProp="name"
                  className="font-extrabold text-slate-900 truncate max-w-[200px] sm:max-w-md bg-red-50/80 text-red-950 px-2.5 py-0.5 rounded-lg border border-red-200/80 shadow-2xs"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  itemProp="item"
                  href={item.href}
                  className="hover:text-red-700 text-slate-600 hover:underline transition-colors font-medium"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
