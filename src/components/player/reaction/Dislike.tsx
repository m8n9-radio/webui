"use client";

import type { FC } from "react";
import { Button } from "@heroui/button";
import { DislikeIcon } from "@/icons/player.icon";

interface Props {
  isLoading: boolean;
  isDisabled: boolean;
  handleClick: () => void;
}

export const Dislike: FC<Readonly<Props>> = ({
  isLoading,
  isDisabled,
  handleClick,
}) => {
  return (
    <Button
      isIconOnly
      color="danger"
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={handleClick}
    >
      <DislikeIcon className="w-4 h-4 text-danger-50" />
    </Button>
  );
};
