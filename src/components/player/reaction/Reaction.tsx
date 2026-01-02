"use client";

import type { FC, ReactNode } from "react";
import { useReactionHook } from "@/hooks/ReactionHook";
import { Like } from "@/components/player/reaction/Like";
import { Dislike } from "@/components/player/reaction/Dislike";

interface Props {
  children: ReactNode;
  uid?: string | undefined;
}

export const Reaction: FC<Props> = ({ children, uid }) => {
  const { isLoading, isDisabled, handleLike, handleDislike } =
    useReactionHook(uid);
  return (
    <>
      <Like
        isLoading={isLoading}
        isDisabled={isDisabled}
        handleClick={handleLike}
      />
      {children}
      <Dislike
        isLoading={isLoading}
        isDisabled={isDisabled}
        handleClick={handleDislike}
      />
    </>
  );
};
