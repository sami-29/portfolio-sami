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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="shortcut icon"
          href="../public/favicon.ico"
          sizes="32x32"
          type="image/x-icon"
        />
      </head>
      <body>
        <Providers>
          <ChakraProvider>
            <Box minHeight="100vh">
              <header>
                <Navbar />
                <ThemeToggle />
              </header>
              {children}
              <footer></footer>
            </Box>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
