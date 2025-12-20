"use client";

import type { FC } from "react";

interface Props {
  current: number;
  peek: number;
}

export const Listener: FC<Props> = ({ current, peek }) => {
  return (
    <div className="absolute p-1.5 z-1 right-4 top-4 bg-foreground-400/60 rounded-2xl backdrop-blur">
      <div>
        <p className="text-sm font-thin">
          {current} / {peek}
        </p>
      </div>
    </div>
  );
};
