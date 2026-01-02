"use server";

import { cookies } from "next/headers";
import type { ReactionResult } from "@/types/reaction.types";
import { likeTrack } from "@/http/tracks";
import { ConflictError } from "@/http/errors";
import { verify } from "@/libs/uid.lib";

export async function likeAction(trackId: string): Promise<ReactionResult> {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid || !verify(uid)) {
    return { success: false, error: "invalid_user_id" };
  }

  try {
    await likeTrack(trackId, uid);
    return { success: true };
  } catch (error) {
    if (error instanceof ConflictError) {
      return { success: false, error: "already_reacted" };
    }
    return { success: false, error: "server_error" };
  }
}
