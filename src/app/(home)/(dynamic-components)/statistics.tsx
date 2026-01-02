import type { FC } from "react";
import { Statistics } from "@/components/statistics/Statistics";
import { getStatistics } from "@/http/radio";

export const DynamicStatistics: FC = async () => {
  const statistics = await getStatistics();

  return <Statistics statistics={statistics} />;
};
