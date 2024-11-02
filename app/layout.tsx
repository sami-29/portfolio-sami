import { Providers } from "../components/Providers";
import Navbar from "../components/MainNavigation/Navbar";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { Box } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='a8d67507-76c6-42d2-b099-540de21a96af'></script>
      </Head>
      <body>
        <Providers>
          <Box minHeight='100vh'>
            <Navbar />
            <Box position={"relative"} pt={16}>
              <ThemeToggle />
              {children}
            </Box>
          </Box>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
