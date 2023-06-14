import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeFilterId : []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
   changeFilterId : (state,action)=>{
    state.activeFilterId = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {changeFilterId} = filterSlice.actions

export default filterSlice.reducer