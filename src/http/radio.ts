import "server-only";

import type { IListen, IRadio } from "../types/radio.types";
import type { IStatistic } from "../types/statistic.types";
import { request } from "@/http/client";

export async function getRadioInfo(): Promise<IRadio> {
  return request<IRadio>("/radio/info", {
    cache: "force-cache",
    next: {
      tags: ["/radio/info"]
    }
  });
}

export async function getListeners(): Promise<IListen> {
  return request<IListen>("/radio/listeners", {
    cache: "force-cache",
    next: {
      revalidate: 3000,
      tags: ["/radio/listeners"]
    }
  });
}

export async function getStatistics(): Promise<IStatistic[]> {
  return request<IStatistic[]>("/radio/statistics", {
    cache: "force-cache",
    next: {
      revalidate: 6000,
      tags: ["/radio/statistics"]
    }
  });
}
