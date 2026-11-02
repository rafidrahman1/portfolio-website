"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { readonly children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <MotionConfig reducedMotion="user">
                <TooltipProvider>
                    {children}
                    <Toaster />
                </TooltipProvider>
            </MotionConfig>
        </QueryClientProvider>
    );
}