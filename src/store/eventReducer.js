import { createSlice } from "@reduxjs/toolkit";

const EventReducerSlice = createSlice({
    name:'EventReducerSlice',
    initialState:{
        movieList:[],
        movieRenderList:[]
    },
    reducers:{
        setMovieList:(state , action) => {
            state.movieList = action.payload;
            state.movieRenderList = action.payload;
        },
        sortByYear: (state) => {
            const allMovies = state.movieRenderList;
            console.log("Before sorting:", allMovies);

            const sortedMovies = [...allMovies].sort((a, b) => {
                const dateA = new Date(a.release_date);
                const dateB = new Date(b.release_date);

                return dateA - dateB;
            });

            state.movieRenderList = [...sortedMovies];
        },
        sortByEpisode:(state) => {

           const allMovies = state.movieList;

            const sortedMovies = [...allMovies].sort((a , b) => {
                const ep1 = a.episode_id;
                const ep2 = b.episode_id;

                return ep1 - ep2;

            });

            state.movieRenderList = [...sortedMovies];
        },
        handleSerach:(state , action) => {
            const searchInput = action.payload.toLowerCase();
            const allMovies = state.movieList;

            const filteredMovies = [...allMovies].filter(item => item.title.toLowerCase().includes(searchInput));

            state.movieRenderList = searchInput?[...filteredMovies] : allMovies;
        }
    }
})

export const {setMovieList , sortByYear , sortByEpisode , handleSerach} = EventReducerSlice.actions;

export default EventReducerSlice.reducer;