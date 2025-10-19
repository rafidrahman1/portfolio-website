import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers";
import { ClientThemeProvider } from "@/components/theme/ClientThemeProvider";
import { WebVitals } from "@/components/performance/WebVitals";
import DarkVeil from "@/components/DarkVeil";
import { Inter, JetBrains_Mono } from "next/font/google";

// Optimize fonts with next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false, // Only load when needed
  fallback: ['monospace'],
});

export const metadata: Metadata = {
    title: {
        default: "Rafid Rahman | Fullstack Developer",
        template: "%s | Rafid Rahman"
    },
    description: "Fullstack developer passionate about building user-focused web applications using Next.js, React, and AI integrations. Specializing in modern web technologies and performance optimization.",
    keywords: [
        "Rafid Rahman",
        "Fullstack Developer",
        "Next.js",
        "React",
        "TypeScript",
        "Web Development",
        "AI Integration",
        "Portfolio",
        "Frontend Developer",
        "Backend Developer"
    ],
    authors: [{ name: "Rafid Rahman" }],
    creator: "Rafid Rahman",
    publisher: "Rafid Rahman",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://rafid.me'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://rafid.me',
        title: 'Rafid Rahman | Fullstack Developer',
        description: 'Fullstack developer passionate about building user-focused web applications using Next.js, React, and AI integrations.',
        siteName: 'Rafid Rahman Portfolio',
        images: [
            {
                url: '/images/profile.jpg',
                width: 1200,
                height: 630,
                alt: 'Rafid Rahman - Fullstack Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rafid Rahman | Fullstack Developer',
        description: 'Fullstack developer passionate about building user-focused web applications using Next.js, React, and AI integrations.',
        images: ['/images/profile.jpg'],
        creator: '@rafidrahman1',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Replace with actual verification code
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        try {
                            document.documentElement.classList.add('dark')
                        } catch (_) {}
                    `,
                }}
            />
        </head>
        <body suppressHydrationWarning={true} className="font-sans">
        <ClientThemeProvider>
        <Providers>
            {/* Fixed background */}
            <div className="fixed inset-0 z-0">
                <DarkVeil />
            </div>
            {/* Content with relative positioning to appear above background */}
            <div className="relative z-10">
                {children}
            </div>
            <SpeedInsights />
            <Analytics />
            <WebVitals />
        </Providers>
        </ClientThemeProvider>
        </body>
        </html>
    );
}