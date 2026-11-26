import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black py-2 px-6 text-xl rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="bg-gray-500 bg-opacity-50 text-white py-2 px-6 text-xl rounded-lg">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;