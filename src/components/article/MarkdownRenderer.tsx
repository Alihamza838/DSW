import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "../ui/Link";
import { Check, Copy, Info, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { ProductGrid } from "../products/ProductGrid";
import { StoreLocator } from "../ui/StoreLocator";
import { ReturnShippingFeeTable } from "./ReturnShippingFeeTable";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopySectionLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className={cn("markdown-body text-ink font-sans leading-relaxed text-base space-y-5 [container-type:inline-size] w-full min-w-0", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h1
                id={id}
                className="group relative text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-ink mt-8 mb-4 tracking-tight scroll-mt-24 border-b border-ink-100 pb-3 flex items-start justify-between gap-2"
              >
                <span className="break-words min-w-0">{children}</span>
                <button
                  type="button"
                  onClick={() => handleCopySectionLink(id)}
                  title="Copy link to section"
                  className="opacity-0 group-hover:opacity-100 shrink-0 text-teal-brand hover:text-teal-dark transition-opacity cursor-pointer"
                >
                  {copiedId === id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </h1>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="group relative text-xl sm:text-2xl md:text-3xl font-display font-bold text-ink mt-8 mb-4 tracking-tight scroll-mt-24 flex items-start justify-between gap-2 border-l-4 border-teal-brand pl-3 sm:pl-3.5 py-1 bg-gradient-to-r from-teal-brand/5 to-transparent rounded-r-lg"
              >
                <span className="break-words min-w-0">{children}</span>
                <button
                  type="button"
                  onClick={() => handleCopySectionLink(id)}
                  title="Copy direct section link"
                  className="opacity-0 group-hover:opacity-100 text-teal-brand hover:text-teal-dark transition-opacity pr-1.5 shrink-0 cursor-pointer"
                >
                  {copiedId === id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="group relative text-lg sm:text-xl font-sans font-bold text-ink mt-6 mb-3 tracking-tight scroll-mt-24 flex items-start justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0 break-words">
                  <span className="text-teal-brand font-extrabold text-lg shrink-0">#</span>
                  <span>{children}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopySectionLink(id)}
                  title="Copy link"
                  className="opacity-0 group-hover:opacity-100 shrink-0 text-teal-brand hover:text-teal-dark transition-opacity cursor-pointer"
                >
                  {copiedId === id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </h3>
            );
          },
          p: ({ children }) => {
            const text = React.Children.toArray(children).join("").trim();
            if (text.startsWith("[PRODUCT_GRID")) {
              const match = text.match(/\[PRODUCT_GRID(?::([a-z0-9-]+))?\]/);
              const storeSlug = match?.[1] || "amazon";
              return (
                <div className="my-6 [container-type:inline-size] w-full min-w-0">
                  <ProductGrid initialStoreSlug={storeSlug} limit={4} inArticle={true} />
                </div>
              );
            }
            if (text.startsWith("[STORE_LOCATOR")) {
              const match = text.match(/\[STORE_LOCATOR(?::([a-z0-9-]+))?\]/);
              const brandSlug = match?.[1] || "amazon";
              return (
                <div className="my-6 [container-type:inline-size] w-full min-w-0">
                  <StoreLocator initialBrandSlug={brandSlug} />
                </div>
              );
            }
            if (text.includes("[RETURN_SHIPPING_FEE_TABLE]")) {
              return <ReturnShippingFeeTable />;
            }
            return <p className="text-sm sm:text-base text-ink-800 leading-relaxed font-sans">{children}</p>;
          },
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-ink-800 my-4 pl-2 font-sans">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-ink-800 my-4 pl-2 font-sans font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-teal-brand bg-teal-50/50 p-4 rounded-r-2xl text-ink-800 font-sans italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-2xl border border-ink-200 shadow-2xs bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-900 text-white font-display font-bold">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-ink-100 text-ink-800">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-teal-50/40 transition-colors">{children}</tr>,
          th: ({ children }) => <th className="p-3 sm:p-4 font-mono uppercase text-xs tracking-wider">{children}</th>,
          td: ({ children }) => <td className="p-3 sm:p-4">{children}</td>,
          a: ({ href, children }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link href={href} className="text-teal-brand font-bold underline hover:text-teal-dark">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-brand font-bold underline hover:text-teal-dark"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
