"use client";

import type { IStatistic } from "@/types/statistic.types";
import useSWR from "swr";

const fetcher = (): Readonly<IStatistic[]> => [
  { description: "", key: "history", icon: "HistoryIcon", tracks: [] },
  { description: "", key: "likes", icon: "LikeIcon", tracks: [] },
];

export const useStatisticHook = (stat: Readonly<IStatistic[]>) => {
  const { data } = useSWR("/api", fetcher, {
    refreshInterval: 10000,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    statistics: stat,
  };
};
