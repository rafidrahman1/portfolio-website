import { cn } from "@/lib/utils";

// Basic skeleton
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function ProjectSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

const calendarSkeletonKeys = Array.from({ length: 365 }, () => crypto.randomUUID());
const legendSkeletonKeys = Array.from({ length: 5 }, () => crypto.randomUUID());

export function GitHubCalendarSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-card/50 backdrop-blur-sm rounded-lg border min-h-[14rem]">
      <div className="flex flex-col items-center space-y-3 sm:space-y-4">
        <Skeleton className="h-6 w-48" />
        <div
          className="grid grid-flow-col gap-0.5 sm:gap-1 min-w-fit mx-auto"
          style={{ gridTemplateRows: "repeat(7, 1fr)", minWidth: "180px" }}
        >
          {calendarSkeletonKeys.map((key) => (
            <Skeleton key={key} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" />
          ))}
        </div>
        <div className="flex space-x-2">
          {legendSkeletonKeys.map((key) => (
            <Skeleton key={key} className="w-6 h-3 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
