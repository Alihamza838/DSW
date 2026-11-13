/**
 * Seo.tsx - per-page <head> tags, rendered into the static HTML at build time by vite-react-ssg
 * (react-helmet-async under the hood): title, description, canonical, Open Graph, Twitter, JSON-LD.
 */
import { Head } from "vite-react-ssg";
import { SITE_NAME, absoluteUrl } from "./config";

export function formatTitle(title: string) {
  const branded = `${title} | ${SITE_NAME}`;
  return title.includes(SITE_NAME) || branded.length > 60 ? title : branded;
}

export default function Seo({
  title,
  description,
  path,
  image = "/og/default.jpg",
  type = "website",
  noindex = false,
  jsonLd = [],
  modified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object[];
  modified?: string;
}) {
  const url = absoluteUrl(path);
  const fullTitle = formatTitle(title);
  const img = absoluteUrl(image);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {modified && <meta property="article:modified_time" content={modified} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Head>
  );
}
