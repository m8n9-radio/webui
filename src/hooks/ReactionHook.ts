"use client";

import { useState, useEffect } from "react";
import { likeAction } from "@/action/like/like.action";
import { dislikeAction } from "@/action/dislike/dislike.action";
import { reactionAction } from "@/action/reaction/reaction.action";

export const useReactionHook = (uid?: string | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(
    typeof uid === "undefined",
  );

  const handleLike = async () => {
    if (typeof uid === "undefined") {
      return;
    }
    setIsLoading(true);
    try {
      await likeAction(uid);
    } finally {
      setIsDisabled(true);
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    if (typeof uid === "undefined") {
      return;
    }
    setIsLoading(true);
    try {
      await dislikeAction(uid);
    } finally {
      setIsDisabled(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof uid !== "undefined") {
      setIsLoading(true);
      setIsDisabled(true);
      reactionAction(uid)
        .then((response) => {
          setIsDisabled(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [uid]);

  return {
    isLoading,
    isDisabled,
    handleLike,
    handleDislike,
  };
};
