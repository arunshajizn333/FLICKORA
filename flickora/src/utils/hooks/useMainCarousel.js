import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addCurrentCarousel } from "../reduxStore/moviesSlice ";


const useMainCarousel = () => {
  const  dispatch=useDispatch()

   const movieList = useSelector((state) => state.movies?.nowPlayingMovies);
   const currentMovie=useSelector((state) => state.movies?.currentCarousel);

   useEffect(() => {
      if (!movieList) return;
     
      const currentMov = Math.floor(Math.random() * movieList.length);

      const mainMovie = movieList[currentMov];
      dispatch(addCurrentCarousel(mainMovie))
        if (!currentMovie) return;
      console.log(currentMovie);
      
   }, [movieList])

  






}

export default useMainCarousel