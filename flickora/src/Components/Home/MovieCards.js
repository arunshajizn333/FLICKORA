import React, { useState } from "react";
import { TMDB_IMG_CDN_URL } from "../../utils/constants";
import MovieCardShimmer from "../shimmers/MovieCardShimmer";

const MovieCards = ({ posterPath, title, rating }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!posterPath) return null;

  const formattedRating =
    typeof rating === "number" && rating > 0 ? rating.toFixed(1) : null;

  return (
    <div className="group relative w-36 sm:w-44 md:w-48 shrink-0 aspect-[2/3] rounded-xl overflow-hidden bg-[#121124] border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-lg cursor-pointer">
      {!isLoaded && (
        <MovieCardShimmer className="absolute inset-0 !w-full !h-full !border-0" />
      )}

      <img
        src={`${TMDB_IMG_CDN_URL}${posterPath}`}
        alt={title || "Movie poster"}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle hover overlay with title & rating */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        {title && (
          <p className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug">
            {title}
          </p>
        )}
        {formattedRating && (
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
            ★ {formattedRating}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCards;
