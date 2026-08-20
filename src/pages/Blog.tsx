import * as React from "react";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "../components/ui/Link";
import { Card, CardContent } from "../components/ui/card";
import { guidesData } from "../data/guides";
import { formatDate } from "../lib/utils";
import { useSEO } from "../hooks/useSEO";
import { BreadcrumbNav } from "../components/ui/BreadcrumbNav";
import { Pagination } from "../components/ui/Pagination";
import { ArticleCardSkeleton } from "../components/ui/skeleton";
import { BrandLogoIcon } from "../components/ui/BrandLogo";
import { GuideImage } from "../components/ui/GuideImage";

const CATEGORIES = ["all", "how-to", "comparison", "seasonal", "consumer-rights", "glossary"];
const ITEMS_PER_PAGE = 9;

export function BlogPage() {
  const [selectedCat, setSelectedCat] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  useSEO({
    title: "What Are the Latest 2026 Store Return Policy Rules? - Expert Consumer Guides",
    description: "Browse our expert library of return policy guides, consumer protection legal audits, worn items exchange rules, and holiday timelines.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Guides & Articles", item: "/blog" },
    ],
  });

  const handleCategorySelect = (cat: string) => {
    setIsLoading(true);
    setSelectedCat(cat);
    setTimeout(() => setIsLoading(false), 300);
  };

  const filtered = selectedCat === "all"
    ? guidesData
    : guidesData.filter((g) => g.category === selectedCat);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCat]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedGuides = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh] space-y-6 font-sans">
      <BreadcrumbNav items={[{ label: "Guides & Articles" }]} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6"
      >
        <div>
          <h1 className="font-display text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Blog
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shrink-0 self-start sm:self-auto">
          <BookOpen className="h-4 w-4 text-red-500" />
          <span>{guidesData.length} Guides & Policy Articles</span>
        </div>
      </motion.div>

      {/* Category filters list */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize font-mono transition-all cursor-pointer ${
              selectedCat === cat
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700 hover:border-red-500 hover:text-red-600"
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Guides Grid list with Motion entry */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {paginatedGuides.map((guide) => {
            return (
              <motion.div
                key={guide.slug}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <Link href={`/blog/${guide.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:border-red-500 bg-white border border-slate-200 flex flex-col rounded-2xl">
                    {/* Blog Featured Image Slot: Insert blog post cover image here */}
                    {/* Path: /public/images/guides/${guide.slug}.png */}
                    <GuideImage slug={guide.slug} title={guide.title} className="h-44 w-full" />
                    <CardContent className="p-6 flex flex-col justify-between flex-grow gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-red-700 font-extrabold bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full">
                          {guide.category.replace("-", " ")}
                        </span>
                        <h2 className="font-display text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors mt-3">
                          {guide.title}
                        </h2>
                        <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between border-t border-slate-100 pt-3 font-mono">
                        <span>Updated {formatDate(guide.updatedAt)}</span>
                        <span>{guide.readingTime} read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 200, behavior: "smooth" });
        }}
        className="mt-6"
      />

      {/* Blog & Consumer Guide FAQs */}
      <section className="mt-16 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">Editorial FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Frequently Asked Questions About Our Policy Guides
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            How we research, audit, and verify store return policies across major retail brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
              <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
              <span>How often are policy guides updated on dswReturnRefund?</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              Our legal analysis team performs monthly audits and updates all retailer guides ahead of major shopping events, policy revisions, and holiday extensions.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
              <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
              <span>Who researches and writes these retail policy articles?</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              All guides are authored by retail industry experts and legal policy analysts with direct experience verifying terms with customer support channels and store registers.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
              <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
              <span>Can I request a guide for a store not listed here?</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              Yes! Use our Contact page to submit a retailer request. Our team prioritized high-demand store policy requests within 48 hours.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
              <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
              <span>Are these guides applicable internationally?</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              We cover both US primary policies as well as regional guidelines for Canada, UK/EU 14-day statutory rights, India, UAE, and South Asia.
            </p>
          </div>
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="mx-auto h-12 w-12 text-slate-300 opacity-60">
            <BrandLogoIcon variant="dark" animated={false} />
          </div>
          <p className="text-ink-400 font-medium">No guides found under this category yet.</p>
        </div>
      )}
    </div>
  );
}
