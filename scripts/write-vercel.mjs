// Regenerates vercel.json from scripts/redirects.mjs: node scripts/write-vercel.mjs
import fs from "node:fs";
import { REDIRECTS, PATTERN_REDIRECTS } from "./redirects.mjs";

const redirects = [
  { source: "/:path*", has: [{ type: "host", value: "www.dswreturnrefund.com" }], destination: "https://dswreturnrefund.com/:path*", permanent: true },
  ...Object.entries(REDIRECTS).map(([from, to]) => ({ source: `${from}(/?)`, destination: to, permanent: true })),
  ...PATTERN_REDIRECTS.map((r) => ({ ...r, permanent: true })),
];
const config = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  cleanUrls: true,
  trailingSlash: true,
  buildCommand: "npm run build",
  outputDirectory: "dist",
  framework: null,
  redirects,
  headers: [
    { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    { source: "/(images|og)/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};
fs.writeFileSync("vercel.json", JSON.stringify(config, null, 2) + "\n");
console.log(`vercel.json: ${redirects.length} redirects`);
