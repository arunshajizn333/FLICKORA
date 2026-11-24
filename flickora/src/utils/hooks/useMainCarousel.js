import { useEffect } from "react";
import { useSelector } from "react-redux"


const useMainCarousel=()=>{

   const movieList = useSelector((state) => state.movies?.nowPlayingMovies);

  useEffect(()=>{
   console.log(movieList);
   
   },[])




}

export default useMainCarousel