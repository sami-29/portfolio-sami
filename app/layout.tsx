import "./globals.css";
import Navbar from "../components/MainNavigation/Navbar";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check for saved theme preference or system preference
    const isDarkMode = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Apply the correct theme
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  return (
    <html lang='en'>
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
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const isDarkMode = localStorage.theme === 'dark' || 
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.classList.toggle('dark', isDarkMode);
            })();
          `
        }} />
      </head>
      <body className='bg-white dark:bg-gray-900 scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-500'>
        <header className='select-none'>
          <Navbar></Navbar>
          <ThemeToggle></ThemeToggle>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
