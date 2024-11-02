import { Providers } from "../components/Providers";
import Navbar from "../components/MainNavigation/Navbar";

import { Box } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="a8d67507-76c6-42d2-b099-540de21a96af"></Script>
      <body>
        <Providers>
          <Box minHeight='100vh'>
            <Navbar />
            <Box position={"relative"} pt={{ base: 12, md: 16 }}>
              {children}
            </Box>
          </Box>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
