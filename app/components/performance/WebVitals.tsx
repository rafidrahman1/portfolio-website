"use client";

import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    // Only run in browser
    if (globalThis.window === undefined) return;

    // Import web-vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => {
        console.log('CLS:', metric);
        // Send to analytics service
        if (globalThis.window !== undefined && (globalThis.window as any).gtag) {
          (globalThis.window as any).gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(metric.value * 1000),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      });

      onINP((metric) => {
        console.log('INP:', metric);
        if (globalThis.window !== undefined && (globalThis.window as any).gtag) {
          (globalThis.window as any).gtag('event', 'web_vitals', {
            name: 'INP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      });

      onFCP((metric) => {
        console.log('FCP:', metric);
        if (globalThis.window !== undefined && (globalThis.window as any).gtag) {
          (globalThis.window as any).gtag('event', 'web_vitals', {
            name: 'FCP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      });

      onLCP((metric) => {
        console.log('LCP:', metric);
        if (globalThis.window !== undefined && (globalThis.window as any).gtag) {
          (globalThis.window as any).gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      });

      onTTFB((metric) => {
        console.log('TTFB:', metric);
        if (globalThis.window !== undefined && (globalThis.window as any).gtag) {
          (globalThis.window as any).gtag('event', 'web_vitals', {
            name: 'TTFB',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }
      });
    });
  }, []);

  return null;
}
