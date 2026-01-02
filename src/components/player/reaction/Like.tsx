"use client";

import type { FC } from "react";
import { Button } from "@heroui/button";
import { LikeIcon } from "@/icons/player.icon";

interface Props {
  isLoading: boolean;
  isDisabled: boolean;
  handleClick: () => void;
}

export const Like: FC<Props> = ({
  isLoading,
  isDisabled,
  handleClick,
}) => {
  return (
    <Button
      isIconOnly
      color="success"
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={handleClick}
    >
      <LikeIcon className="w-4 h-4 text-success-100" />
    </Button>
  );
};
