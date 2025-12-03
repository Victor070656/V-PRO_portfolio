"use client";

import { useEffect, useRef, useState } from "react";
import { getVideoType, getYouTubeVideoId, getGoogleDriveEmbedUrl } from "@/lib/video-utils";

interface VideoPlayerProps {
  url: string;
  onProgress?: (progress: { played: number; playedSeconds: number; loaded: number }) => void;
  onEnded?: () => void;
  onDuration?: (duration: number) => void;
  initialProgress?: number; // in seconds
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoPlayer({ url, onProgress, onEnded, onDuration, initialProgress = 0 }: VideoPlayerProps) {
  const videoType = getVideoType(url);
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // YouTube Player Implementation
  useEffect(() => {
    if (videoType !== 'youtube') return;

    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = initializePlayer;
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      const videoId = getYouTubeVideoId(url);
      if (!videoId) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          start: Math.floor(initialProgress),
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            if (onDuration) {
              onDuration(event.target.getDuration());
            }
          },
          onStateChange: (event: any) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (event.data === 1) {
              startProgressTracking();
            } else {
              stopProgressTracking();
            }
            
            if (event.data === 0 && onEnded) {
              onEnded();
            }
          }
        }
      });
    };

    loadYouTubeAPI();

    return () => {
      stopProgressTracking();
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [url, videoType]);

  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    
    progressInterval.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (onProgress) {
          onProgress({
            played: currentTime / duration,
            playedSeconds: currentTime,
            loaded: playerRef.current.getVideoLoadedFraction()
          });
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  if (videoType === 'youtube') {
    return (
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative">
        <div id="youtube-player" className="w-full h-full"></div>
      </div>
    );
  }

  if (videoType === 'drive') {
    const embedUrl = getGoogleDriveEmbedUrl(url);
    if (!embedUrl) return <div className="bg-gray-200 p-4 rounded text-center">Invalid Google Drive URL</div>;

    return (
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay"
          allowFullScreen
        ></iframe>
        <div className="text-xs text-center text-gray-500 mt-1">
          Note: Automatic progress tracking is not supported for Google Drive videos.
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-gray-900 rounded-xl flex items-center justify-center text-white">
      Unsupported Video Type
    </div>
  );
}