import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useTrailerFinder from "../../utils/hooks/useTrailerFinder";

const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (window._ytApiPromise) {
    return window._ytApiPromise;
  }

  window._ytApiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === "function") prevCallback();
      resolve(window.YT);
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  });

  return window._ytApiPromise;
};

const VideoBackground = ({ movieId, backdropPath, title }) => {
  useTrailerFinder(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  const trailerKey = trailerVideo?.key;

  useEffect(() => {
    setIsVideoReady(false);
    setVideoFailed(false);

    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // Ignore destroy errors if player wasn't initialized
      }
      playerRef.current = null;
    }

    if (!trailerKey) return;

    let isCancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (isCancelled || !playerContainerRef.current) return;

      playerContainerRef.current.innerHTML = "";
      const mountNode = document.createElement("div");
      playerContainerRef.current.appendChild(mountNode);

      playerRef.current = new YT.Player(mountNode, {
        width: "100%",
        height: "100%",
        videoId: trailerKey,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (isCancelled) return;
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (isCancelled) return;
            if (event.data === YT.PlayerState.PLAYING) {
              if (!revealTimeoutRef.current) {
                revealTimeoutRef.current = setTimeout(() => {
                  if (!isCancelled) setIsVideoReady(true);
                }, 1200);
              }
            } else if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
          onError: () => {
            if (isCancelled) return;
            setVideoFailed(true);
            setIsVideoReady(false);
          },
        },
      });
    });

    return () => {
      isCancelled = true;
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
        revealTimeoutRef.current = null;
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }
    };
  }, [trailerKey]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#0b0b14]">
      {/* High-res TMDB Backdrop (shown first, and as fallback if no trailer is available) */}
      {backdropPath && (
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt={title || "Movie Backdrop"}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 ${isVideoReady ? "opacity-0 scale-100" : "opacity-100 scale-105"
            }`}
        />
      )}

      {/* Background YouTube Trailer (fades in after backdrop once actively playing) */}
      {trailerKey && !videoFailed && (
        <div
          ref={playerContainerRef}
          className={`absolute inset-0 w-full h-full scale-[1.35] origin-center pointer-events-none transition-opacity duration-1000 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 [&>iframe]:block ${isVideoReady ? "opacity-100" : "opacity-0"
            }`}
        />
      )}

      {/* Bottom subtle gradient for card edge & pagination dots */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090914]/90 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
