"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Maximize2, Settings, SkipForward, SkipBack } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  videoType: 'youtube' | 'google-drive' | 'direct';
  title?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onWatchTime?: (time: number) => void;
  onLastPosition?: (position: number) => void;
  autoplay?: boolean;
  poster?: string;
}

export default function VideoPlayer({
  videoUrl,
  videoType,
  title = "Video Lesson",
  onProgress,
  onComplete,
  onWatchTime,
  onLastPosition,
  autoplay = false,
  poster
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extract video ID or convert URL based on type
  const getVideoEmbedUrl = () => {
    switch (videoType) {
      case 'youtube':
        const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        if (youtubeMatch && youtubeMatch[1]) {
          return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&autoplay=${autoplay ? 1 : 0}`;
        }
        return videoUrl;

      case 'google-drive':
        const driveMatch = videoUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch && driveMatch[1]) {
          return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
        }
        return videoUrl;

      case 'direct':
        return videoUrl;

      default:
        return videoUrl;
    }
  };

  const embedUrl = getVideoEmbedUrl();

  // Handle progress tracking
  useEffect(() => {
    if (duration > 0) {
      const progress = (currentTime / duration) * 100;
      onProgress?.(Math.round(progress));

      // Save last position every 10 seconds
      if (currentTime % 10 < 1) {
        onLastPosition?.(currentTime);
        onWatchTime?.(currentTime);
      }

      // Check for completion (90% of video)
      if (progress >= 90 && !isPlaying) {
        onComplete?.();
      }
    }
  }, [currentTime, duration, isPlaying, onProgress, onComplete, onLastPosition, onWatchTime]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case ' ':
        e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(currentTime + 10, duration);
  };

  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(currentTime - 10, 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderYouTubeEmbed = () => {
    return (
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  };

  const renderCustomPlayer = () => {
    return (
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden group">
        <video
          ref={videoRef}
          src={embedUrl}
          poster={poster}
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onCanPlay={() => setIsLoading(false)}
          onError={() => {
            setError('Failed to load video');
            setIsLoading(false);
          }}
          playsInline
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center text-white p-6">
              <p className="text-lg mb-2">Video Load Error</p>
              <p className="text-sm opacity-75">{error}</p>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseMove={showControlsTemporarily}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => {
            if (isPlaying) {
              setShowControls(false);
            }
          }}
        >
          <div className="flex items-center justify-between text-white">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Speed Control */}
              <div className="relative group">
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors text-xs">
                  {playbackSpeed}x
                </button>
                <div className="absolute bottom-full mb-2 right-0 bg-black/90 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full px-3 py-1 text-left text-sm hover:bg-white/20 rounded ${
                        playbackSpeed === speed ? 'bg-white/20' : ''
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Control */}
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Skip Controls */}
              <button
                onClick={skipBackward}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={skipForward}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full aspect-video bg-black rounded-lg shadow-xl relative"
      onMouseMove={showControlsTemporarily}
    >
      {/* Video Type Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {videoType === 'youtube' && 'YouTube'}
          {videoType === 'google-drive' && 'Google Drive'}
          {videoType === 'direct' && 'Video'}
        </span>
      </div>

      {/* Video Player */}
      {videoType === 'youtube' ? renderYouTubeEmbed() : renderCustomPlayer()}

      {/* Video Info */}
      {title && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg max-w-xs truncate">
            {title}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && videoType !== 'youtube' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="absolute bottom-4 left-4 z-10 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
          <p className="mb-1 font-semibold">Keyboard Shortcuts:</p>
          <p>Space: Play/Pause</p>
          <p>← →: Skip 10s</p>
          <p>F: Fullscreen</p>
          <p>M: Mute</p>
        </div>
      </div>
    </div>
  );
}