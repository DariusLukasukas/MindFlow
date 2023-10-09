"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function Providers({ children }: ThemeProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
