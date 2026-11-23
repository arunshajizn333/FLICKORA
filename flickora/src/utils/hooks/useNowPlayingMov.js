import { useEffect } from "react";
import {TMDB_API_OPTIONS} from "../constants"

const useNowPlayingMov = () => {

    const getNowPlayingMov = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing', TMDB_API_OPTIONS)
        const json = await data.json()
        console.log(json);

    }

    useEffect(() => {
        getNowPlayingMov()

    }, [])
}

export default useNowPlayingMov;