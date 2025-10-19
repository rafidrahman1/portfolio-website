"use client";

import { Suspense, ReactNode } from "react";
import { Skeleton, ProjectSkeleton, CardSkeleton, GitHubCalendarSkeleton } from "./loading-skeleton";

interface LoadingWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  type?: "default" | "project" | "card" | "github-calendar";
}

export function LoadingWrapper({ children, fallback, type = "default" }: LoadingWrapperProps) {
  const getDefaultFallback = () => {
    switch (type) {
      case "project":
        return <ProjectSkeleton />;
      case "card":
        return <CardSkeleton />;
      case "github-calendar":
        return <GitHubCalendarSkeleton />;
      default:
        return (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        );
    }
  };

  return (
    <Suspense fallback={fallback || getDefaultFallback()}>
      {children}
    </Suspense>
  );
}

// Specialized loading wrappers
export function ProjectLoadingWrapper({ children }: { children: ReactNode }) {
  return (
    <LoadingWrapper type="project" fallback={
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-24">
                <div className="flex-1 w-full max-w-lg lg:max-w-none">
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
                <div className="flex-1 space-y-4 sm:space-y-6 w-full">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    }>
      {children}
    </LoadingWrapper>
  );
}

export function GitHubCalendarLoadingWrapper({ children }: { children: ReactNode }) {
  return (
    <LoadingWrapper type="github-calendar">
      {children}
    </LoadingWrapper>
  );
}
