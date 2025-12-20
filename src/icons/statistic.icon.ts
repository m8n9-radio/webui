import type { IconType } from "react-icons";
import {
  FaEarListen as ListenIcon,
  FaClockRotateLeft as HistoryIcon,
} from "react-icons/fa6";
import { GiBackup as RotateIcon } from "react-icons/gi";
import { BiSolidLike as LikeIcon } from "react-icons/bi";
import { BiSolidDislike as DislikeIcon } from "react-icons/bi";
import type { IconStringType } from "@/types/statistic.types";

const iconMap: Record<IconStringType, IconType> = {
  ListenIcon,
  HistoryIcon,
  RotateIcon,
  LikeIcon,
  DislikeIcon,
};

export function getIconComponent(key: IconStringType): IconType {
  return iconMap[key];
}
