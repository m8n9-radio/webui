"use client";

import { useState, useEffect } from "react";
import { likeAction } from "@/action/like/like.action";
import { dislikeAction } from "@/action/dislike/dislike.action";
import { reactionAction } from "@/action/reaction/reaction.action";

export const useReactionHook = (trackId?: string | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(
    typeof trackId === "undefined",
  );

  const handleLike = async () => {
    if (typeof trackId === "undefined") {
      return;
    }
    setIsLoading(true);
    try {
      const result = await likeAction(trackId);
      if (result.success || result.error === "already_reacted") {
        setIsDisabled(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    if (typeof trackId === "undefined") {
      return;
    }
    setIsLoading(true);
    try {
      const result = await dislikeAction(trackId);
      if (result.success || result.error === "already_reacted") {
        setIsDisabled(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof trackId !== "undefined") {
      setIsLoading(true);
      setIsDisabled(true);
      reactionAction(trackId)
        .then((response) => {
          setIsDisabled(response.hasReacted);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [trackId]);

  return {
    isLoading,
    isDisabled,
    handleLike,
    handleDislike,
  };
};
