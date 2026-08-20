export interface FAQItem {
  q: string;
  a: string;
}

export interface FactRowItem {
  label: string;
  value: string;
  status?: "yes" | "no" | "warning" | "neutral" | string;
}

export interface SourceCitation {
  title: string;
  url: string;
  publisher?: string;
  dateAccessed?: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: string;
  storeId?: string;
  publishedDate: string;
  updatedDate: string;
  verifiedSourceUrl?: string;
  verifiedSourceDate?: string;
  quickAnswer?: string;
  faq?: FAQItem[];
  relatedSlugs?: string[];
  // Additional metadata properties for rich rendering
  author?: string;
  readingTime?: string;
  heroImage?: string;
  summary?: string;
  factRows?: FactRowItem[];
  sources?: SourceCitation[];
  relatedStores?: string[];
  tags?: string[];
  proseContent?: string;
  status?: "published" | "needs-review" | "archived";
  steps?: { title: string; description: string }[];
}
