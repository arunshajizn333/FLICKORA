import { useEffect, useState } from "react";
import { API_IMG_URL, TMDB_API_OPTIONS } from "../constants";

const useFetchImg = (movieId) => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    let isCancelled = false;

    const getData = async () => {
      try {
        const res = await fetch(
          `${API_IMG_URL}${movieId}/images`,
          TMDB_API_OPTIONS
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!isCancelled) {
          setImages(json);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch TMDB images:", err);
        }
      }
    };

    getData();

    return () => {
      isCancelled = true;
    };
  }, [movieId]);

  return images;
};

export default useFetchImg;
