"use client";

import type { IListen } from "@/types/radio.types";
import { listenAction } from "@/action/listen/listen.action";
import useSWR from "swr";

export const useListenHook = (initialData: IListen) => {
  const { data } = useSWR("/radio/listeners", listenAction, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    refreshInterval: 10000,
  });

  return {
    current: data?.current ?? initialData.current,
    peak: data?.peak ?? initialData.peak,
  };
};
