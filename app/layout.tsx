import { Providers } from "../components/Providers";
import Navbar from "../components/MainNavigation/Navbar";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
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
      </body>
    </html>
  );
}
