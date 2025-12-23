import "server-only";
import "@/assets/globals.css";

import type { ReactNode } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { cn } from "@/libs/cn.lib";
import { fetchRadioInfo } from "@/app/(home)/(dynamic-components)/radio-info";
import { fontLobster, fontOnest } from "@/libs/font.lib";
import { Providers } from "@/provider";
import { ThemeSwith } from "@/components/ThemeSwith";

interface Props {
  children: Readonly<ReactNode>;
}

export default async function ({ children }: Readonly<Props>) {
  const { name } = await fetchRadioInfo();
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
                <p className="font-bold text-2xl text-inherit font-lobster">
                  {name}
                </p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
              <ThemeSwith />
            </NavbarContent>
          </Navbar>
          <main className={"w-xs mx-auto pt-4"}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
