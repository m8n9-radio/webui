import "server-only";

import type { FC } from "react";
import { setTimeout } from "node:timers/promises";
import { PlayerWrapper } from "@/components/player/PlayerWrapper";

import type { IRadio } from "@/types/radio.types";

export async function fetch(): Promise<Readonly<IRadio>> {
  return new Promise((resolve) =>
    resolve({
      name: "Radio Station",
      description: "",
      // streamUrl: "https://stream.radioparadise.com/rock-320",
      // streamUrl: "https://stream.radioparadise.com/rock-192",
      streamUrl: "http://10.1.100.20:8000/stream",
      listener: {
        current: 5,
        peek: 6,
      },
      createAt: "string",
    }),
  );
}

export const DynamicRadioInfo: FC = async () => {
  await setTimeout(3000);
  const radioInfo = await fetch();

  return <PlayerWrapper radioInfo={radioInfo} />;
};
