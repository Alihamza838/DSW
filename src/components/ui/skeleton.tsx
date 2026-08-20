import React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "circular" | "rounded" | "text";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer-pulse",
        variant === "circular" && "rounded-full",
        variant === "rounded" && "rounded-2xl",
        variant === "text" && "h-4 rounded-md w-3/4",
        variant === "default" && "rounded-xl",
        className
      )}
      {...props}
    />
  );
}

// 1. Store Card Skeleton - Exact match to StoreCard.tsx layout
export function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4 font-sans flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-2.5">
          <Skeleton className="h-5 w-24 rounded-md" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-lg" />
          </div>
        </div>

        {/* Store Title */}
        <Skeleton className="h-6 w-2/3 rounded-lg" />

        {/* Quick Answer Summary (3 key-value rows) */}
        <div className="space-y-2 py-1">
          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <Skeleton className="h-3.5 w-24 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>
          <div className="flex justify-between items-center py-1">
            <Skeleton className="h-3.5 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
    </div>
  );
}

// 2. Guide Card Skeleton - Exact match to GuideCard.tsx layout
export function GuideCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4 font-sans flex flex-col justify-between">
      <div className="space-y-3">
        {/* Category & Read Time Header Strip */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        {/* Title (2 lines) */}
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
        </div>

        {/* Description (2 lines) */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-5/6 rounded-md" />
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-1.5 pt-1">
          <Skeleton className="h-4 w-12 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
        </div>
      </div>

      {/* Footer / Action CTA */}
      <div className="pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
        <Skeleton className="h-3.5 w-28 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

export const ArticleCardSkeleton = GuideCardSkeleton;

// 3. Product Card Skeleton - Exact match to ProductCard.tsx layout
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4 font-sans flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Top Badges & Favorite Heart */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-20 rounded-md hidden sm:block" />
            <Skeleton className="h-8 w-8 rounded-xl" />
          </div>
        </div>

        {/* Product Image Aspect Area */}
        <Skeleton className="h-44 w-full rounded-xl" />

        {/* Title */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-4.5 w-full rounded-md" />
          <Skeleton className="h-4.5 w-2/3 rounded-md" />
        </div>

        {/* Price & Discount row */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}

// 4. Store Detail Page Skeleton - Exact match to StoreDetail.tsx
export function StoreDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans animate-fade-in">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      {/* Store Header Hero */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48 rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-28 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* 4 Quick Answer Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-lg" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Column & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Policy Table Skeleton */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-2xs">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>

          {/* Step Guide Skeleton */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-2xs">
            <Skeleton className="h-6 w-56 rounded-md" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          <Skeleton className="h-52 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

// 5. Guide / Blog Detail Page Skeleton - Exact match to BlogDetail.tsx
export function GuideDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-md" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>

      {/* Article Header */}
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-9 w-full sm:w-5/6 rounded-xl" />
        <Skeleton className="h-5 w-3/4 rounded-md" />

        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Hero Image Banner */}
      <Skeleton className="h-72 sm:h-96 w-full rounded-3xl" />

      {/* Article Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

// 6. Generic Card & Text Skeletons
export function SkeletonCard() {
  return <StoreCardSkeleton />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 rounded-md ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex gap-4">
        <Skeleton className="h-5 w-1/4 rounded-md" />
        <Skeleton className="h-5 w-1/4 rounded-md" />
        <Skeleton className="h-5 w-1/4 rounded-md" />
        <Skeleton className="h-5 w-1/4 rounded-md" />
      </div>
      <div className="divide-y divide-slate-100 p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 pt-2">
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

