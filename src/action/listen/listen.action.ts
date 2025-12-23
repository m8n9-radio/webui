"use server";

import type { IListener } from "@/types/radio.types";

export async function likeAction(): Promise<IListener> {
  console.log(`Listen action called`);

  // TODO: Implement backend API call

  return { peak: 2, current: 1 };
}
