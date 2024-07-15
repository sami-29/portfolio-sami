import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../components/Providers";
import Navbar from "../components/MainNavigation/Navbar";

import { Box } from "@chakra-ui/react";

import Script from "next/script";
import { portfolioConfig } from "../utils/config";

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.seo.baseUrl),
  title: { default: portfolioConfig.seo.siteName, template: `%s | ${portfolioConfig.seo.siteName}` },
  description: portfolioConfig.seo.siteDescription,
  keywords: [...portfolioConfig.seo.keywords],
  authors: [{ name: portfolioConfig.seo.authorName, url: portfolioConfig.seo.baseUrl }],
  creator: portfolioConfig.seo.authorName,
  publisher: portfolioConfig.seo.authorName,
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: portfolioConfig.seo.siteName,
    url: portfolioConfig.seo.baseUrl,
    title: portfolioConfig.seo.siteName,
    description: portfolioConfig.seo.siteDescription,
    images: [
      {
        url: portfolioConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: portfolioConfig.seo.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioConfig.seo.siteName,
    description: portfolioConfig.seo.siteDescription,
    images: [portfolioConfig.seo.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Script
        async
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='a8d67507-76c6-42d2-b099-540de21a96af'></Script>
      <body>
        <Providers>
          <Box minHeight='100vh'>
            <Navbar />
            <Box position={"relative"} pt={{ base: 12, md: 16 }}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
