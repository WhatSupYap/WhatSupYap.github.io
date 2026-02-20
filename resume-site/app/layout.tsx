import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import GlobalPrintButton from "@/components/GlobalPrintButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getSiteConfig } from "@/lib/markdown";

// ...

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      images: siteConfig.ogImage ? [{ url: siteConfig.ogImage }] : [],
    },
    keywords: siteConfig.keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="flex gap-2">
            <GlobalPrintButton />
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
