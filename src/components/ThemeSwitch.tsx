"use client";

import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/icons/theme.icon";
import { cn } from "@/libs/cn.lib";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-14 h-8 bg-default-200 rounded-full animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <Switch
      defaultSelected
      color="primary"
      size="sm"
      isSelected={theme === "dark"}
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      endContent={<MoonIcon className="w-2 h-2" />}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={cn("w-3 h-3", className)} />
        ) : (
          <SunIcon className={cn("w-3 h-3", className)} />
        )
      }
      aria-label="Toggle theme"
    />
  );
};
