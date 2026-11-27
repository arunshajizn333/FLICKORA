import React from "react";

const MovieCardShimmer = ({ className = "" }) => {
  return (
    <div
      className={`w-36 sm:w-44 md:w-48 shrink-0 aspect-[2/3] rounded-xl overflow-hidden bg-[#121124] border border-white/10 animate-pulse ${className}`}
    >
      <div className="w-full h-full bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
    </div>
  );
};

export default MovieCardShimmer;
