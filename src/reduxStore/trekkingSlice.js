import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trekkingData : null,
  trekkingPackage: null
}

export const trekkingSlice = createSlice({
  name: 'trekking',
  initialState,
  reducers: {
   addTrekkingData : (state,action)=>{
    state.trekkingData = action.payload
   },
   addTrekkingPackage : (state,action)=>{
    state.trekkingPackage = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {addTrekkingData,addTrekkingPackage} = trekkingSlice.actions

export default trekkingSlice.reducer