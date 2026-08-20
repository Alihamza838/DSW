import React from "react";
import { VisualStepGuide } from "./VisualStepGuide";
import type { Step } from "../../types";

export function StepGuide({
  title = "Step-by-Step Return Process",
  steps,
  brandName = "Retailer",
}: {
  title?: string;
  steps: Step[];
  brandName?: string;
}) {
  if (!steps || steps.length === 0) return null;

  return <VisualStepGuide title={title} steps={steps} brandName={brandName} />;
}



