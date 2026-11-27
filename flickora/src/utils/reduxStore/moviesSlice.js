import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        currentCarousel: null,
        currentCarouselIndex: 0,
        trailerVideo: null,
        movieLogo: null,
        isLogoLoading: true,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addCurrentCarousel: (state, action) => {
            state.currentCarousel = action.payload;
        },
        setCurrentCarouselIndex: (state, action) => {
            state.currentCarouselIndex = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addMovieLogo: (state, action) => {
            state.movieLogo = action.payload;
        },
        setIsLogoLoading: (state, action) => {
            state.isLogoLoading = action.payload;
        },
    },
});

export const {
    addNowPlayingMovies,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
    addCurrentCarousel,
    setCurrentCarouselIndex,
    addTrailerVideo,
    addMovieLogo,
    setIsLogoLoading
} = moviesSlice.actions;

export default moviesSlice.reducer;