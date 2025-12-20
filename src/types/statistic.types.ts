import type { ITrack } from "@/types/track.type";

export interface IStatistic {
  key: Readonly<string>;
  description: Readonly<string>;
  icon: Readonly<IconStringType>;
  tracks: Readonly<ITrack[]>;
}

export type IconStringType =
  | "ListenIcon"
  | "HistoryIcon"
  | "RotateIcon"
  | "LikeIcon"
  | "DislikeIcon";
