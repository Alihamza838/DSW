/** Site-wide constants (domain, name, authors). Change the domain here only. */
export const SITE_URL = "https://dswreturnrefund.com";
export const SITE_NAME = "DSWReturnRefund";
export const SITE_TAGLINE = "Store return policies, checked against each retailer's own website";
export const CONTACT_EMAIL = "akhamza386@gmail.com";

/** Absolute URL with the trailing slash the host uses (vercel.json: trailingSlash true). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return `${SITE_URL}${p}`;
}

/** Internal link with a trailing slash, matching the canonical URLs. */
export function href(path: string): string {
  if (path === "/" || /^https?:/.test(path) || path.includes("#") || path.includes("?")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export const AUTHORS: Record<string, Author> = {
  "ali-hamza": {
    id: "ali-hamza",
    name: "Ali Hamza",
    role: "Founder and editor",
    bio: "Ali Hamza runs DSWReturnRefund. He checks every store's policy against the retailer's own returns page, records the date he checked it, and rewrites the page when the rules change.",
  },
  "malik-umar": {
    id: "malik-umar",
    name: "Malik Umar",
    role: "Contributor",
    bio: "Malik Umar writes guides on store returns and online shopping for DSWReturnRefund. Every fact in his guides is checked against the official policy pages listed on the store pages.",
  },
};
