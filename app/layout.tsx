import "./globals.css";
import Navbar from "../components/MainNavigation/Navbar";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import ThemeProvider from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link
          rel='shortcut icon'
          href='../public/favicon.ico'
          sizes='32x32'
          type='image/x-icon'
        />
      </head>
      <body className='bg-white dark:bg-gray-900 scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-500'>
        <ThemeProvider>
        <header className='select-none'>
          <Navbar />
          <ThemeToggle />
        </header>
        {children}
        <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
