import { createSlice } from '@reduxjs/toolkit'

 const nowPlayingMovSlice = createSlice({
  name: 'nowPlayingMov',
  initialState :null,
  reducers: {
    addNowPlayingMov : (state,action)=>{
        state.addNowPlayingMovies = action.payload
    },
}

})

export const {addNowPlayingMov}=nowPlayingMovSlice.actions
export default nowPlayingMovSlice.reducer