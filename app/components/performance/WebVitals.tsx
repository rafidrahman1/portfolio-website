"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

function report(metric: Metric) {
  if (process.env.NODE_ENV !== "production") console.log(`${metric.name}:`, metric);

  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (!gtag) return;
  gtag("event", "web_vitals", {
    name: metric.name,
    // CLS is a unitless score, so scale it; the other metrics are in milliseconds.
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    event_category: "Web Vitals",
    event_label: metric.id,
    non_interaction: true,
  });
}

export function WebVitals() {
  useEffect(() => {
    // Imported dynamically so web-vitals stays out of the initial bundle.
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(report);
      onINP(report);
      onFCP(report);
      onLCP(report);
      onTTFB(report);
    });
  }, []);

  return null;
}
