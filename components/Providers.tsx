"use client";

import { Provider } from "./ui/provider";
import { Toaster } from "./ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider defaultTheme="dark">
      {children}
      <Toaster />
    </Provider>
  );
}
