import React from "react";
import { BookOpen, Clock } from "lucide-react";
import { AuthorByline } from "./AuthorByline";
import { GuideImage } from "../ui/GuideImage";

interface ArticleHeaderProps {
  title: string;
  category: string;
  slug: string;
  readingTime?: string;
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  verifiedSourceUrl?: string;
  verifiedSourceDate?: string;
  heroImage?: string;
}

export function ArticleHeader({
  title,
  category,
  slug,
  readingTime,
  author,
  publishedDate,
  updatedDate,
  verifiedSourceUrl,
  verifiedSourceDate,
  heroImage,
}: ArticleHeaderProps) {
  return (
    <header className="space-y-4 font-sans">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 border border-red-200 px-3 py-1 text-xs font-mono font-extrabold text-red-800 uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5 text-red-600" />
          {category.replace("-", " ")}
        </span>
        {readingTime && (
          <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 font-semibold bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>{readingTime} Read</span>
          </span>
        )}
      </div>

      {/* H1 Title (question-phrased per guidelines) */}
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight">
        {title}
      </h1>

      {/* Author Byline & Verified Source Badge */}
      <AuthorByline
        author={author}
        publishedDate={publishedDate}
        updatedDate={updatedDate}
        verifiedSourceUrl={verifiedSourceUrl}
        verifiedSourceDate={verifiedSourceDate}
      />

      {/* Hero Image Frame - Blog Cover Image Slot: Insert blog article hero image here */}
      {/* Path: /public/images/guides/${slug}.png */}
      <div className="pt-2">
        <GuideImage
          slug={slug}
          title={title}
          image={heroImage}
           fitMode="ambient"
          className="h-60 sm:h-80 md:h-[420px] w-full rounded-3xl border border-slate-200/90 shadow-2xs"
        />
      </div>
    </header>
  );
}
