import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../constants";
import {
  addMovieLogo,
  addTrailerVideo,
  setIsLogoLoading,
} from "../reduxStore/moviesSlice";

const checkYouTubeAvailability = async (key) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${key}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    if (!res.ok) return "unavailable";
    const json = await res.json();
    return json?.error ? "unavailable" : "valid";
  } catch {
    clearTimeout(timeoutId);
    return "unknown";
  }
};

const useTrailerFinder = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useEffect(() => {
    if (!movieId) return;
    let isCancelled = false;

    dispatch(setIsLogoLoading(true));
    dispatch(addMovieLogo(null));
    dispatch(addTrailerVideo(null));

    // Fetch official movie logo independently so it resolves as fast as possible
    const fetchLogo = async () => {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/movie/${movieId}/images?include_image_language=en,null`,
          TMDB_API_OPTIONS
        );
        const json = await res.json();
        if (isCancelled) return;

        const logos = json?.logos || [];
        const englishLogo =
          logos.find((logo) => logo.iso_639_1 === "en") || logos[0];
        dispatch(addMovieLogo(englishLogo?.file_path || null));
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch movie logo:", err);
          dispatch(addMovieLogo(null));
        }
      } finally {
        if (!isCancelled) {
          dispatch(setIsLogoLoading(false));
        }
      }
    };

    // Fetch and validate YouTube trailer availability
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/movie/${movieId}/videos`,
          TMDB_API_OPTIONS
        );
        const json = await res.json();
        if (isCancelled) return;

        const ytVideos = (json?.results || []).filter(
          (v) => v.site === "YouTube" && v.key
        );
        const prioritized = [
          ...ytVideos.filter((v) => v.type === "Trailer"),
          ...ytVideos.filter((v) => v.type === "Teaser"),
          ...ytVideos.filter(
            (v) => v.type !== "Trailer" && v.type !== "Teaser"
          ),
        ];

        let validTrailer = null;
        let firstUnknown = null;

        for (const candidate of prioritized) {
          const status = await checkYouTubeAvailability(candidate.key);
          if (isCancelled) return;
          if (status === "valid") {
            validTrailer = candidate;
            break;
          }
          if (status === "unknown" && !firstUnknown) {
            firstUnknown = candidate;
          }
        }

        // If noembed confirmed one, use it; if noembed was unreachable, let YT.Player try firstUnknown
        dispatch(addTrailerVideo(validTrailer || firstUnknown || null));
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch TMDB trailer:", err);
          dispatch(addTrailerVideo(null));
        }
      }
    };

    fetchLogo();
    fetchTrailer();

    return () => {
      isCancelled = true;
    };
  }, [movieId, dispatch]);

  return trailerVideo;
};

export default useTrailerFinder;
