/**
 * Route table for vite-react-ssg: every route is rendered to its own static HTML file at build
 * time, with its own title, description, canonical and structured data. Dynamic routes list
 * their pages in getStaticPaths, from the same data the pages render.
 */
import type { RouteRecord } from "vite-react-ssg";
import Layout from "./site/Layout";
import { POLICIES } from "./data/policies";
import { CATEGORIES, COMPARE_PAIRS, pairSlug } from "./site/data";
import { GUIDES } from "./site/guides";
import { BRANDS, COUNTRIES } from "./data/countries";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/site/Layout.tsx",
    children: [
      { index: true, lazy: () => import("./site/pages/HomePage") },
      { path: "stores", lazy: () => import("./site/pages/StoresPage") },
      {
        path: "stores/category/:category",
        lazy: () => import("./site/pages/CategoryPage"),
        getStaticPaths: () => CATEGORIES.map((c) => `stores/category/${c.slug}`),
      },
      {
        path: "stores/:slug",
        lazy: () => import("./site/pages/StorePage"),
        getStaticPaths: () => POLICIES.map((p) => `stores/${p.slug}`),
      },
      { path: "countries", lazy: () => import("./site/pages/CountriesPage") },
      {
        path: "countries/:country",
        lazy: () => import("./site/pages/CountryPage"),
        getStaticPaths: () => COUNTRIES.map((c) => `countries/${c.slug}`),
      },
      { path: "brands", lazy: () => import("./site/pages/BrandsPage") },
      {
        path: "brands/:brand",
        lazy: () => import("./site/pages/BrandPage"),
        getStaticPaths: () => BRANDS.map((b) => `brands/${b.slug}`),
      },
      { path: "compare", lazy: () => import("./site/pages/ComparePage") },
      {
        path: "compare/:pair",
        lazy: () => import("./site/pages/ComparePairPage"),
        getStaticPaths: () => COMPARE_PAIRS.map(([a, b]) => `compare/${pairSlug(a, b)}`),
      },
      { path: "blog", lazy: () => import("./site/pages/BlogPage") },
      {
        path: "blog/:slug",
        lazy: () => import("./site/pages/GuidePage"),
        getStaticPaths: () => GUIDES.map((g) => `blog/${g.slug}`),
      },
      { path: "about", lazy: () => import("./site/pages/AboutPage") },
      { path: "editorial-policy", lazy: () => import("./site/pages/EditorialPage") },
      { path: "contact", lazy: () => import("./site/pages/ContactPage") },
      { path: "disclaimer", lazy: () => import("./site/pages/DisclaimerPage") },
      { path: "privacy", lazy: () => import("./site/pages/PrivacyPage") },
      { path: "terms", lazy: () => import("./site/pages/TermsPage") },
      // Rendered to dist/404.html, which Vercel serves with a 404 status
      { path: "404", lazy: () => import("./site/pages/NotFoundPage") },
      { path: "*", lazy: () => import("./site/pages/NotFoundPage") },
    ],
  },
];
