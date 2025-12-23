"use server";

import { cookies } from "next/headers";
import type { CheckReactionResult } from "@/types/reaction.types";

export async function reactionAction(
  trackId: string,
): Promise<CheckReactionResult> {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) {
    return { hasReacted: false };
  }

  // Extract user_id from UID cookie (first 32 characters before the dot)
  const userId = uid.split(".")[0];

  if (userId.length !== 32) {
    return { hasReacted: false };
  }

  try {
    const response = await fetch(
      `${process.env.APP_BACKEND_DNS}/reactions/check`,
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

    if (!response.ok) {
      return { hasReacted: false };
    }

    const data = await response.json();

    return {
      hasReacted: data.has_reacted,
      reaction: data.reaction,
    };
  } catch {
    return { hasReacted: false };
  }
}
