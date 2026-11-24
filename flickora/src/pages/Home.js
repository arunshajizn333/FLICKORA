import React from 'react';
import useHomeMovies from '../utils/hooks/useHomeMovies'
import MainContainer from '../components/Home/MainContainer';
import SecondaryContainer from '../components/Home/SecondaryContainer';

const Home = () => {

  useHomeMovies();

  return (
    <div className="flex-grow p-8 text-white">

      <MainContainer/>
      <SecondaryContainer/>

    </div>
  );
};

export default Home;
