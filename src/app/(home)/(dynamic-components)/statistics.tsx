import "server-only";

import type { FC } from "react";
import { setTimeout } from "node:timers/promises";
import { Statistics } from "@/components/statistics/Statistics";

import type { IStatistic } from "@/types/statistic.types";

const track = {
  id: "1",
  title: "Track h.1.1",
  cover: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  dislikes: 0,
  likes: 0,
  listeners: 0,
  rotate: 1,
};

export async function fetch(): Promise<Readonly<IStatistic[]>> {
  return new Promise((resolve) =>
    resolve([
      { description: "", key: "history", icon: "HistoryIcon", tracks: [track] },
      { description: "", key: "listen", icon: "ListenIcon", tracks: [] },
      { description: "", key: "rotate", icon: "RotateIcon", tracks: [] },
      { description: "", key: "likes", icon: "LikeIcon", tracks: [] },
      { description: "", key: "dislikes", icon: "DislikeIcon", tracks: [] },
    ]),
  );
}

export const DynamicStatistics: FC = async () => {
  await setTimeout(3000);
  const statistics = await fetch();

  return <Statistics statistics={statistics} />;
};
