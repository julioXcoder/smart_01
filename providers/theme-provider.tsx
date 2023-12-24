"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        loading
      </div>
    );

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
