import React from "react";

/** Clean, flat phone frame. No 3D tilt, no gloss. */
export const MobileFrame = ({
  children,
  className = "w-[15.5rem] sm:w-[17rem]",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative mx-auto max-w-full ${className}`}>
    <div className="rounded-[2.25rem] border border-white/15 bg-[#161618] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)]">
      <div className="overflow-hidden rounded-[1.75rem] bg-black">{children}</div>
    </div>
  </div>
);
