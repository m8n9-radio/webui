import "server-only";
import type { CheckReactionResult } from "../types/reaction.types";
import { request } from "@/http/client";

export async function likeTrack(trackId: string, userId: string): Promise<void> {
  await request<void>(`/tracks/${trackId}/like`, {
    method: "POST",
    headers: { "X-User-ID": userId },
  });
}

export async function dislikeTrack(
  trackId: string,
  userId: string,
): Promise<void> {
  await request<void>(`/tracks/${trackId}/dislike`, {
    method: "POST",
    headers: { "X-User-ID": userId },
  });
}

export async function getReaction(
  trackId: string,
  userId: string,
): Promise<CheckReactionResult> {
  return request<CheckReactionResult>(`/tracks/${trackId}/reaction`, {
    headers: { "X-User-ID": userId },
  });
}
