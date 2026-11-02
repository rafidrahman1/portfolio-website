import React from "react";

/** Clean, flat phone frame. No 3D tilt, no gloss. */
export const MobileFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-[15.5rem] max-w-full sm:w-[17rem]">
    <div className="rounded-[2.25rem] border border-white/15 bg-[#171717] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="overflow-hidden rounded-[1.75rem] bg-black">{children}</div>
    </div>
  </div>
);
