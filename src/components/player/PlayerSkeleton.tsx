"use client";

import type { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";

export const PlayerSkeleton: FC = () => {
  return (
    <Card
      isFooterBlurred
      className="w-full"
      classNames={{
        body: "p-0",
      }}
    >
      <CardHeader>
        <Skeleton className="w-48 h-5 rounded-lg" />
      </CardHeader>
      <CardBody className="w-full h-80">
        <Skeleton className="z-0 w-full h-full rounded-none" />
      </CardBody>
      <CardFooter className="justify-between">
        {/* Like button skeleton */}
        <Button
          isIconOnly
          size="lg"
          variant="light"
          isDisabled
          className="opacity-50"
        >
          <Skeleton className="w-6 h-6 rounded-full" />
        </Button>

        {/* Play/Pause button skeleton */}
        <Button size="lg" isIconOnly isDisabled className="opacity-50">
          <Skeleton className="w-6 h-6 rounded-full" />
        </Button>

        {/* Dislike button skeleton */}
        <Button
          isIconOnly
          size="lg"
          variant="light"
          isDisabled
          className="opacity-50"
        >
          <Skeleton className="w-6 h-6 rounded-full" />
        </Button>
      </CardFooter>
    </Card>
  );
};
