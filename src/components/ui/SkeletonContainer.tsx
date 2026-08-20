import React from "react";
import {
  Skeleton,
  StoreCardSkeleton,
  GuideCardSkeleton,
  ProductCardSkeleton,
  StoreDetailSkeleton,
  GuideDetailSkeleton,
  SkeletonText,
  SkeletonTable,
} from "./skeleton";

interface SkeletonContainerProps {
  isLoading: boolean;
  type?: "card" | "text" | "table" | "grid" | "store" | "guide" | "product" | "store-detail" | "guide-detail";
  count?: number;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function SkeletonContainer({
  isLoading,
  type = "card",
  count = 6,
  children,
  fallback,
}: SkeletonContainerProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (type === "store-detail") {
    return <StoreDetailSkeleton />;
  }

  if (type === "guide-detail") {
    return <GuideDetailSkeleton />;
  }

  return (
    <div className="w-full font-sans animate-fade-in">
      {type === "store" || type === "grid" || type === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      ) : type === "guide" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <GuideCardSkeleton key={i} />
          ))}
        </div>
      ) : type === "product" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : type === "table" ? (
        <SkeletonTable rows={count} />
      ) : type === "text" ? (
        <SkeletonText lines={count * 3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

