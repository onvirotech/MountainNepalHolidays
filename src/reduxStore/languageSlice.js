import { createSlice } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const initialState = {
  language: ''
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
   changeLanguage : (state,action)=>{
    state.language = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {changeLanguage} = languageSlice.actions

export default languageSlice.reducer