import * as React from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { PartnerToolsBanner } from "./components/layout/PartnerToolsBanner";

// Core Pages
import { HomePage } from "./pages/Home";
import { StoresPage } from "./pages/Stores";
import { StoreDetailPage } from "./pages/StoreDetail";
import { ComparePage } from "./pages/Compare";
import { BlogPage } from "./pages/Blog";
import { BlogDetailPage } from "./pages/BlogDetail";
import { NotFoundPage } from "./pages/NotFoundPage";

// Lazy Loaded Legal Compliance Pages
const AboutPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.ContactPage })));
const EditorialPolicyPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.EditorialPolicyPage })));
const DisclaimerPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.DisclaimerPage })));
const PrivacyTermsPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.PrivacyTermsPage })));
const TermsOfUsePage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.TermsOfUsePage })));

import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { PageTransition } from "./components/layout/PageTransition";
import { CookieBanner } from "./components/ui/CookieBanner";
import { StructuredData } from "./components/seo/StructuredData";
import { SEOManager } from "./components/seo/SEOManager";

function PageLoadingFallback() {
  return (
    <div className="relative min-h-[50vh] py-12 px-4 max-w-4xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-xl" />
      <div className="h-12 w-3/4 bg-slate-200 animate-pulse rounded-2xl" />
      <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-lg" />
      <div className="h-64 w-full bg-slate-100 animate-pulse rounded-2xl" />
    </div>
  );
}

export default function App() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  React.useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simplified router matching
  const renderPage = () => {
    // 1. Homepage (DSW Pillar Article)
    if (path === "/" || path === "") {
      return <HomePage />;
    }

    // 2. Blog List Page
    if (path === "/blog" || path === "/blog/") {
      return <BlogPage />;
    }

    // 3. Blog & Guide Detail Page
    if (path.startsWith("/blog/")) {
      const slug = path.replace("/blog/", "").replace(/\/$/, "");
      return <BlogDetailPage slug={slug} />;
    }
    if (path.startsWith("/guides/")) {
      const slug = path.replace("/guides/", "").replace(/\/$/, "");
      return <BlogDetailPage slug={slug} />;
    }

    // 4. Policy Comparison Page (Supports all aliases & URLs)
    if (
      path === "/compare" ||
      path === "/compare/" ||
      path.startsWith("/compare") ||
      path.startsWith("/stores/compare") ||
      path.startsWith("/compare-stores") ||
      path.startsWith("/compare-policies") ||
      path.startsWith("/policy-comparer") ||
      path.startsWith("/policy-comparison")
    ) {
      return <ComparePage />;
    }

    // 5. Stores List Page
    if (path === "/stores" || path === "/stores/") {
      return <StoresPage />;
    }

    // 5. Individual Store Detail Page
    if (path.startsWith("/stores/")) {
      const slug = path.replace("/stores/", "").split("/")[0];
      if (slug) {
        return <StoreDetailPage slug={slug} />;
      }
    }

    // 6. Static Legal Pages
    if (path === "/about" || path === "/about/") return <AboutPage />;
    if (path === "/contact" || path === "/contact/") return <ContactPage />;
    if (path === "/editorial-policy" || path === "/editorial-policy/" || path === "/editorial") return <EditorialPolicyPage />;
    if (path === "/disclaimer" || path === "/legal-disclaimer" || path === "/disclaimer/") return <DisclaimerPage />;
    if (path === "/privacy" || path === "/privacy-policy" || path === "/privacy/") return <PrivacyTermsPage />;
    if (path === "/terms" || path === "/terms-of-use" || path === "/terms/") return <TermsOfUsePage />;

    // Fallback 404
    return <NotFoundPage />;
  };

  return (
    <ErrorBoundary>
      <StructuredData>
        <SEOManager />
        <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans antialiased">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-red-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-xl"
          >
            Skip to main content
          </a>

          <Header />

          <main className="flex-1" id="main-content">
            <React.Suspense fallback={<PageLoadingFallback />}>
              <PageTransition key={path}>
                <ErrorBoundary>
                  {renderPage()}
                </ErrorBoundary>
              </PageTransition>
            </React.Suspense>
          </main>

          <PartnerToolsBanner />
          <Footer />
          <CookieBanner />
        </div>
      </StructuredData>
    </ErrorBoundary>
  );
}
