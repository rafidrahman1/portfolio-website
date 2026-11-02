import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/portfolio";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers";
import { WebVitals } from "@/components/performance/WebVitals";
import { Geist, Geist_Mono } from "next/font/google";

// Optimize fonts with next/font
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: false,
  fallback: ["monospace"],
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

// Structured data so search engines can understand who the site is about.
function buildPersonJsonLd() {
    const sameAs = [portfolio.hero.socialGithubUrl, portfolio.hero.socialLinkedinUrl].filter(Boolean);
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: site.title,
        description: site.description,
        url: site.url,
        sameAs,
    };
}

// "<" is escaped so content can never close the script tag.
const personJsonLd = JSON.stringify(buildPersonJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
        <body suppressHydrationWarning={true} className="bg-background font-sans text-foreground">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd }} />
        <Providers>
            {children}
            <SpeedInsights />
            <Analytics />
            <WebVitals />
        </Providers>
        </body>
        </html>
    );
}
