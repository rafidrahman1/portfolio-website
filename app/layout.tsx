import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
        <body suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
        <Providers>
            {children}
            <SpeedInsights />
        </Providers>
        </ThemeProvider>
        </body>
        </html>
    );
}