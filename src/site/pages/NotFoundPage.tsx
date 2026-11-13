import { Link } from "react-router-dom";
import Seo from "../Seo";
import { Container } from "../ui";

export function NotFoundContent() {
  return (
    <Container className="py-20 text-center">
      <Seo title="Page not found" description="This page does not exist. Search for a store's return policy or browse the list of stores." path="/404" noindex />
      <p className="text-sm font-bold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-2 text-4xl font-bold text-ink">We couldn't find that page</h1>
      <p className="mx-auto mt-4 max-w-xl text-ink-2">The link may be old. Every store we cover is in the list of stores, and older guides now point to the matching store page.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/stores/" className="rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800">
          Browse all stores
        </Link>
        <Link to="/" className="rounded-xl border border-line bg-card px-5 py-3 font-semibold text-ink hover:bg-soft">
          Home
        </Link>
      </div>
    </Container>
  );
}

export function Component() {
  return <NotFoundContent />;
}
