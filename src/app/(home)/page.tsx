import "server-only";

import { Suspense } from "react";
import { metadata } from "@/libs/metadata.lib";
import { DynamicStatistics } from "@/app/(home)/(dynamic-components)/statistics";
import { DynamicRadioInfo } from "@/app/(home)/(dynamic-components)/radio-info";
import { StatisticsSkeleton } from "@/components/statistics/StatisticsSkeleton";
import { PlayerSkeleton } from "@/components/player/PlayerSkeleton";

export function generateMetadata() {
  return metadata();
}

export default function () {
  return (
    <>
      <Suspense fallback={<PlayerSkeleton />}>
        <DynamicRadioInfo />
      </Suspense>
      <Suspense fallback={<StatisticsSkeleton />}>
        <DynamicStatistics />
      </Suspense>
    </>
  );
}
