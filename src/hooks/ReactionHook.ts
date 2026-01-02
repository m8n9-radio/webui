"use client";

import { useEffect, useState } from "react";
import { likeAction } from "@/action/like/like.action";
import { dislikeAction } from "@/action/dislike/dislike.action";
import { reactionAction } from "@/action/reaction/reaction.action";
import useSWR from "swr";

export const useReactionHook = (trackId?: string | undefined) => {
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(trackId, "================================");
  }, [trackId]);

  const { data, isLoading: swrLoading } = useSWR(
    trackId ? ["/tracks/reaction", trackId] : null,
    ([_, id]) => {
      console.log("SWR fetcher called with trackId:", id);
      return reactionAction(id);
    },
  );

  const isLoading = swrLoading || actionLoading;
  const isDisabled = !trackId || data?.hasReacted || false;

  const handleLike = async () => {
    if (!trackId) {
      return;
    }
    setActionLoading(true);
    try {
      const result = await likeAction(trackId);
      if (result.success || result.error === "already_reacted") {
        // Optionally revalidate to update the state
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!trackId) {
      return;
    }
    setActionLoading(true);
    try {
      const result = await dislikeAction(trackId);
      if (result.success || result.error === "already_reacted") {
        // Optionally revalidate to update the state
      }
    } finally {
      setActionLoading(false);
    }
  };

  return {
    isLoading,
    isDisabled,
    handleLike,
    handleDislike,
  };
};
