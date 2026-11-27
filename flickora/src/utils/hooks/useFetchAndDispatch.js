import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_BASE_URL, TMDB_API_OPTIONS } from "../constants";

const useFetchAndDispatch = (endpoint, actionCreator, selector) => {
  const dispatch = useDispatch();
  const cachedData = useSelector(selector || (() => null));

  useEffect(() => {
    // Only fetch if data is not already in Redux store (memoization/caching)
    if (cachedData) return;

    const getData = async () => {
      try {
        const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, TMDB_API_OPTIONS);
        const json = await res.json();
        dispatch(actionCreator(json.results));
      
        
      } catch (err) {
        console.error("Failed to fetch TMDB data:", err);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);
};

export default useFetchAndDispatch;