import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/portfolio";
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

const { site } = portfolio;

export async function generateMetadata(): Promise<Metadata> {
    const defaultTitle = `${site.name} | ${site.title}`;
    const ogImage = site.ogImagePath;

    return {
        title: {
            default: defaultTitle,
            template: `%s | ${site.name}`,
        },
        description: site.description,
        keywords: site.keywords,
        authors: [{ name: site.author }],
        creator: site.author,
        publisher: site.author,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(site.metadataBaseUrl),
        alternates: {
            canonical: "/",
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: site.url,
            title: defaultTitle,
            description: site.description,
            siteName: `${site.name} Portfolio`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${site.name} - ${site.title}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: defaultTitle,
            description: site.description,
            images: [ogImage],
            creator: site.twitterHandle,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            google: site.googleSiteVerification,
        },
    };
}

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