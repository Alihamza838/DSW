import * as React from "react";
import { TopLoadingBar } from "./TopLoadingBar";
import { GuideDetailSkeleton } from "./skeleton";

export function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopLoadingBar isLoading={true} />
      <GuideDetailSkeleton />
    </div>
  );
}
