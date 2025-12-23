"use client";

import type { FC } from "react";
import { StreamTitile } from "@/components/player/StreamTitle";
import { StreamUrl } from "@/components/player/StreamUrl";
import type { IRadio } from "@/types/radio.types";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { usePlayerHook } from "@/hooks/PlayerHook";
import { PlayIcon, PauseIcon } from "@/icons/player.icon";
import { Reaction } from "@/components/player/reaction/Reaction";
import { Listener } from "@/components/player/Listener";

interface Props {
  radioInfo: Readonly<IRadio>;
}

export const Player: FC<Readonly<Props>> = ({ radioInfo }) => {
  const { isLoading, isPlaying, metadata, uid, toggle } =
    usePlayerHook(radioInfo);
  return (
    <Card
      isFooterBlurred
      className="w-full"
      classNames={{
        body: "p-0",
      }}
    >
      <CardHeader>
        <StreamTitile
          isLoading={isLoading}
          streamTitle={metadata?.StreamTitle}
        />
      </CardHeader>
      <CardBody className="relative w-full h-80">
        <Listener
          current={radioInfo.listener.current}
          peak={radioInfo.listener.peak}
        />
        <StreamUrl
          streamTitle={metadata?.StreamTitle}
          streamUrl={metadata?.StreamUrl}
        />
      </CardBody>
      <CardFooter className="justify-between place-items-center-safe">
        <Reaction uid={uid}>
          <Button
            color="default"
            size="lg"
            isDisabled={isLoading}
            isLoading={isLoading}
            onPress={toggle}
          >
            {!isLoading && isPlaying && <PauseIcon />}
            {!isLoading && !isPlaying && <PlayIcon />}
          </Button>
        </Reaction>
      </CardFooter>
    </Card>
  );
};
