import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./userSlice"
import nowPlayingMovReducer from "./nowPlayingMov"

export const appStore = configureStore({
  reducer: {
    user : userReducer,
    nowPlayingMov : nowPlayingMovReducer
  }
})

