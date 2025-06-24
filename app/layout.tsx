import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Rafid Rahman | Fullstack Developer",
  description: "I am a fullstack developer passionate about building user-focused web apps using Next.js and AI integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      {/*<QueryClientProvider client={queryClient}>*/}
          {/*<TooltipProvider>*/}
          {children}
          <SpeedInsights/>
          {/*</TooltipProvider>*/}
      {/*</QueryClientProvider>*/}
      </body>
    </html>
  );
}
