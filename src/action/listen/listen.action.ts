"use server";

import type { IListen } from "@/types/radio.types";
import { getListeners } from "@/http/radio";

export async function listenAction(): Promise<IListen> {
  try {
    return await getListeners();
  } catch {
    return { current: 0, peak: -1 };
  }
}
