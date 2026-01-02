import "server-only";
import "@/assets/globals.css";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { cn } from "@/libs/cn.lib";
import { fontLobster, fontOnest } from "@/libs/font.lib";
import { Providers } from "@/provider";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { RadioName } from "@/components/navbar/RadioName";

interface Props {
  children: ReactNode;
}

export default function ({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <body
        className={cn(
          "antialiased h-screen",
          fontOnest.variable,
          fontLobster.variable,
        )}
      >
        <Providers>
          <Navbar isBordered>
            <NavbarContent justify="start"></NavbarContent>
            <NavbarContent justify="center">
              <NavbarBrand>
                <Suspense fallback={
                  <p className="font-bold text-2xl text-inherit font-lobster">
                    Loading...
                  </p>
                }>
                  <RadioName />
                </Suspense>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
              <ThemeSwitch />
            </NavbarContent>
          </Navbar>
          <main className={"w-xs mx-auto pt-4"}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
