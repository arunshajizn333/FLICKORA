import { createSlice } from '@reduxjs/toolkit'

 const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState :null,
  reducers: {
    addUser : (state,action)=>{
        return action.payload
    },
    removeUser: ()=>{
        return null
  }
}

})

export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer