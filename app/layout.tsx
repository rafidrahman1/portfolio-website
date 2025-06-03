import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Header/Navbar";

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
      <Navbar/>
      {children}
      <Footer/>
      <SpeedInsights/>
      </body>
    </html>
  );
}
