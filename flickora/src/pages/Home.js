import React from "react";
import useHomeMovies from "../utils/hooks/useHomeMovies";
import MainContainer from "../components/Home/MainContainer";
import SecondaryContainer from "../components/Home/SecondaryContainer";

const Home = () => {
  useHomeMovies();

  return (
    <div className="w-full text-white overflow-x-clip">
      <MainContainer />
      <div className="relative z-20 px-4 sm:px-8 mt-6 pb-8">
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Home;
