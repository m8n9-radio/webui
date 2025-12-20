"use client";

import dynamic from "next/dynamic";
import type { ComponentType, FC } from "react";
import type { IRadio } from "@/types/radio.types";
import { PlayerSkeleton } from "@/components/player/PlayerSkeleton";

interface Props {
  radioInfo: Readonly<IRadio>;
}

export const PlayerWrapper: ComponentType<Readonly<Props>> = dynamic(
  (): Promise<FC<Readonly<Props>>> =>
    import("@/components/player/Player").then((m) => m.Player),
  {
    ssr: false,
    loading: () => <PlayerSkeleton />,
  },
);
