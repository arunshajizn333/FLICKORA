import React from "react";

const MainContainerShimmer = () => {
  return (
    <div className="w-full px-4 sm:px-8 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 relative w-full aspect-video min-h-[300px] sm:min-h-0 rounded-2xl bg-[#121124] border border-white/10 animate-pulse flex items-center px-11 sm:px-12">
          <div className="space-y-4 max-w-md w-full">
            <div className="h-6 w-32 bg-white/10 rounded-full" />
            <div className="h-10 bg-white/10 rounded-md w-3/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="flex gap-3 pt-2">
              <div className="h-10 w-32 bg-purple-500/30 rounded-xl" />
              <div className="h-10 w-36 bg-white/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainerShimmer;
