/**
 * Layout.tsx - header, footer and the page outlet shared by every route.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { POLICIES } from "../data/policies";
import { CATEGORIES } from "./data";
import { COUNTRIES } from "../data/countries";
import { ScrollEffects } from "./ScrollEffects";
import { CountrySuggestion } from "./CountryPicker";
import { formatDate } from "./data";
import { SITE_NAME, href } from "./config";
import { Container } from "./ui";

const NAV = [
  { to: "/stores/", label: "Stores" },
  { to: "/countries/", label: "Countries" },
  { to: "/brands/", label: "Brands" },
  { to: "/compare/", label: "Compare" },
  { to: "/blog/", label: "Guides" },
];
const FOOTER_STORES = ["dsw", "walmart", "target", "amazon", "costco", "nike", "amazon-uk", "asos", "amazon-ae", "noon", "daraz", "flipkart"];

const LATEST = POLICIES.reduce((m, p) => (p.checked > m ? p.checked : m), "");

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <svg viewBox="0 0 100 100" className="h-9 w-9" aria-hidden="true">
        <rect x="2" y="2" width="96" height="96" rx="22" fill="#0D9488" />
        <path
          d="M 50 50 C 62 33, 84 33, 84 50 C 84 67, 62 67, 50 50 C 38 33, 16 33, 16 50 C 16 67, 38 67, 50 50 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="6.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="82" cy="33" r="4" fill="#5EEAD4" />
      </svg>
      <span className="font-serif text-xl font-bold tracking-tight text-ink">
        DSW<span className="text-brand-700">ReturnRefund</span>
      </span>
    </Link>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      action="/stores/"
      method="get"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q.trim() ? `/stores/?q=${encodeURIComponent(q.trim())}` : "/stores/");
      }}
    >
      <label className="relative block">
        <span className="sr-only">Search a store</span>
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a store…"
          className="h-11 w-full rounded-xl border border-line bg-card pl-10 pr-3 text-[15px] text-ink placeholder:text-ink-3 focus:border-brand-500 focus:outline-none"
        />
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </label>
    </form>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollEffects />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <div className="bg-navy text-slate-300">
        <Container className="flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-xs">
          <p className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-300" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>
              Independent consumer guide · {POLICIES.length} stores in {COUNTRIES.length} countries · policies checked {formatDate(LATEST)}
            </span>
          </p>
          <Link to="/editorial-policy/" className="hidden font-semibold text-white underline-offset-2 hover:underline sm:inline">
            How we verify policies
          </Link>
        </Container>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <Container className="flex h-16 items-center gap-4">
          <Logo />
          <nav aria-label="Main" className="ml-2 hidden items-center gap-0.5 md:flex lg:ml-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-2 text-[15px] font-semibold transition lg:px-3 ${isActive ? "bg-brand-50 text-brand-800" : "text-ink-2 hover:bg-soft hover:text-ink"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <SearchBox className="ml-auto hidden w-64 lg:block" />
          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </Container>
        {open && (
          <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
            <Container className="space-y-3 py-4">
              <SearchBox />
              <nav aria-label="Mobile" className="grid grid-cols-2 gap-2">
                {[...NAV, { to: "/about/", label: "About" }].map((n) => (
                  <Link key={n.to} to={n.to} className="rounded-xl border border-line bg-card px-4 py-3 font-semibold text-ink">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </Container>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <CountrySuggestion pathname={pathname} />

      <footer className="mt-20 border-t border-line bg-navy text-slate-300">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="font-serif text-xl font-bold text-white">
              DSW<span className="text-brand-300">ReturnRefund</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Plain-English summaries of store return policies, each checked against the retailer's own website and dated.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Independent guide. Not affiliated with, endorsed by or sponsored by DSW Designer Shoe Warehouse or any retailer listed. Store names are trademarks of
              their owners.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Popular stores</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {FOOTER_STORES.map((s) => {
                const p = POLICIES.find((x) => x.slug === s);
                return p ? (
                  <li key={s}>
                    <Link to={href(`/stores/${s}`)} className="hover:text-white hover:underline">
                      {p.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">By country</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {COUNTRIES.map((c) => (
                <li key={c.slug}>
                  <Link to={href(`/countries/${c.slug}`)} className="hover:text-white hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">By category</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={href(`/stores/category/${c.slug}`)} className="hover:text-white hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Site</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[
                ["/about/", "About us"],
                ["/brands/", "Brands by country"],
                ["/editorial-policy/", "How we check policies"],
                ["/contact/", "Contact & corrections"],
                ["/disclaimer/", "Disclaimer"],
                ["/privacy/", "Privacy policy"],
                ["/terms/", "Terms of use"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <div className="border-t border-white/10">
          <Container className="py-5 text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE_NAME}. Policies change: always confirm the final details on the retailer's official page, linked on every store page.
          </Container>
        </div>
      </footer>
    </div>
  );
}
