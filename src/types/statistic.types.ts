import type { ITrack } from "@/types/track.type";

export interface IStatistic {
  key: string;
  description: string;
  icon: IconStringType;
  tracks: ITrack[];
}

export type IconStringType =
  | "ListenIcon"
  | "HistoryIcon"
  | "RotateIcon"
  | "LikeIcon"
  | "DislikeIcon";
