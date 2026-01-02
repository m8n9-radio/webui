"use server";

import type { IStatistic } from "@/types/statistic.types";
import { getStatistics } from "@/http/radio";

export async function statisticsAction(): Promise<IStatistic[]> {
  try {
    return await getStatistics();
  } catch {
    return [];
  }
}
