"use client";

import type { IcyMetadata } from "icecast-metadata-player";

export const processingMetadata = (
  metadata: IcyMetadata,
): { meta: IcyMetadata; uid?: string } => {
  if (!metadata || !metadata.StreamTitle) {
    return { meta: metadata };
  }

  const streamTitle = metadata.StreamTitle;
  const md5Regex = /\[([a-f0-9]{32})\]$/;
  const match = streamTitle.match(md5Regex);

  if (match) {
    const uid = match[1];
    const cleanTitle = streamTitle.replace(md5Regex, "").trim();

    return {
      meta: {
        ...metadata,
        StreamTitle: cleanTitle,
      },
      uid,
    };
  }

  return { meta: metadata };
};
