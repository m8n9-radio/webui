"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import IcecastMetadataPlayer, {
  type IcyMetadata,
} from "icecast-metadata-player";
import type { IRadio } from "@/types/radio.types";
import { processingMetadata } from "@/libs/icy.lib";

export const usePlayerHook = ({ name, streamUrl }: IRadio) => {
  const playerRef = useRef<IcecastMetadataPlayer | null>(null);

  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IcyMetadata | undefined>(undefined);
  const [uid, setUid] = useState<string | undefined>(undefined);

  const autoStartPlaying = useCallback(async () => {
    try {
      if (playerRef.current && isMountedRef.current) {
        const audioElement = playerRef.current.audioElement;
        if (audioElement) {
          audioElement.muted = true;
          audioElement.volume = 0;
        }
        await playerRef.current.play();
        setIsLoading(false);
      }
    } catch (_) {
      setIsLoading(false);
    }
  }, []);

  const initializePlayer = useCallback(async () => {
    try {
      setIsLoading(true);
      playerRef.current = new IcecastMetadataPlayer(streamUrl as string, {
        metadataTypes: ["icy"],
        bufferLength: 0,
        retryTimeout: 10,
        retryDelayMin: 0.5,
        retryDelayMax: 2,
        onMetadata: (metadata: IcyMetadata) => {
          if (isMountedRef.current) {
            if (metadata?.StreamTitle) {
              const { meta, uid } = processingMetadata(metadata);
              setUid(uid);
              setMetadata(meta);
              document.title = `${metadata.StreamTitle} | ${name}`;
            } else {
              document.title = name;
            }
          }
        },
        onStreamStart: () => {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        },
        onPlay: () => {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        },
        onStop: () => {
          if (isMountedRef.current) {
            setPlaying(false);
            setIsLoading(false);
          }
        },
        onRetry: () => {
          if (isMountedRef.current) {
            setPlaying(false);
            setIsLoading(true);
          }
        },
        onRetryTimeout: () => {
          if (isMountedRef.current) {
            setPlaying(false);
            setIsLoading(true);
          }
        },
        onError: (message: string, error?: Error) => {
          console.error("[Player] Error:", message, error);
          if (isMountedRef.current) {
            setPlaying(false);
            setIsLoading(false);
          }
        },
      });

      await autoStartPlaying();
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Initialization failed";
      console.error("Initialization error:", err);
      if (isMountedRef.current) {
        console.error(errorMsg);
        setIsLoading(false);
      }
    }
  }, [streamUrl, name, autoStartPlaying]);

  const toggle = useCallback(() => {
    if (!playerRef.current?.audioElement) return;

    const audioElement = playerRef.current.audioElement;
    const newPlayingState = !isPlaying;

    if (newPlayingState) {
      audioElement.muted = false;
      audioElement.volume = 0;

      const fadeIn = () => {
        if (!audioElement || audioElement.volume >= 0.99) {
          audioElement.volume = 1;
          return;
        }
        audioElement.volume = Math.min(1, audioElement.volume + 0.05);
        requestAnimationFrame(fadeIn);
      };
      fadeIn();
    } else {
      const fadeOut = () => {
        if (!audioElement || audioElement.volume <= 0.01) {
          audioElement.volume = 0;
          audioElement.muted = true;
          return;
        }
        audioElement.volume = Math.max(0, audioElement.volume - 0.05);
        requestAnimationFrame(fadeOut);
      };
      fadeOut();
    }

    setPlaying(newPlayingState);
  }, [isPlaying]);

  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }
    isMountedRef.current = true;

    initializePlayer();

    return () => {
      isMountedRef.current = false;
    };
  }, [initializePlayer]);

  return { isLoading, isPlaying, metadata, uid, toggle };
};
