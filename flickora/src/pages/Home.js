import React from 'react';
import useHomeMovies from '../utils/hooks/useHomeMovies'

const Home = () => {

  useHomeMovies();


  return (
    <div className="flex-grow p-8 text-white">
      <h1 className="text-3xl font-bold">Welcome to Flickora AI</h1>
      <h2>vfhhdhfh</h2>
    </div>
  );
};

export default Home;
