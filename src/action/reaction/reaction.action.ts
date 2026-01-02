"use server";

import { cookies } from "next/headers";
import type { CheckReactionResult } from "@/types/reaction.types";
import { getReaction } from "@/http/tracks";
import { verify } from "@/libs/uid.lib";

export async function reactionAction(
  trackId: string,
): Promise<CheckReactionResult> {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid || !verify(uid)) {
    return { hasReacted: false };
  }

  try {
    const a = await getReaction(trackId, uid);
    console.log(a, "================");
    return a;
  } catch {
    return { hasReacted: false };
  }
}
