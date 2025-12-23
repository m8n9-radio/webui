"use server";

import { cookies } from "next/headers";
import type { ReactionResult } from "@/types/reaction.types";

export async function dislikeAction(trackId: string): Promise<ReactionResult> {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) {
    return { success: false, error: "no_user_id" };
  }

  // Extract user_id from UID cookie (first 32 characters before the dot)
  const userId = uid.split(".")[0];

  if (userId.length !== 32) {
    return { success: false, error: "invalid_user_id" };
  }

  try {
    const response = await fetch(
      `${process.env.APP_BACKEND_DNS}/reactions/dislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          user_id: userId,
          track_id: trackId,
        }),
      },
    );

    if (response.status === 409) {
      return { success: false, error: "already_reacted" };
    }

    if (response.status === 404) {
      return { success: false, error: "track_not_found" };
    }

    if (!response.ok) {
      return { success: false, error: "server_error" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "network_error" };
  }
}
