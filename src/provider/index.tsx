"use client";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";
import { ErrorBoundary } from "@/components/error-boundary/error-boundary.component";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <HeroUIProvider className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </ErrorBoundary>
  );
};
