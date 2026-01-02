import "server-only";

import type { FC } from "react";
import { PlayerWrapper } from "@/components/player/PlayerWrapper";
import { getRadioInfo } from "@/http/radio";

export const DynamicRadioInfo: FC = async () => {
  const radioInfo = await getRadioInfo();

  return <PlayerWrapper radioInfo={radioInfo} />;
};
