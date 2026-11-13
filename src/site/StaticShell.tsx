import type { ReactNode } from "react";
import Seo from "./Seo";
import { breadcrumbSchema } from "./schema";
import { Breadcrumbs, Container } from "./ui";

export default function StaticShell({ title, seoTitle, description, path, children }: { title: string; seoTitle?: string; description: string; path: string; children: ReactNode }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <Container className="py-8 sm:py-10">
      <Seo title={seoTitle ?? title} description={description} path={path} jsonLd={[breadcrumbSchema(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">{title}</h1>
      <div className="prose-read mt-6">{children}</div>
    </Container>
  );
}
