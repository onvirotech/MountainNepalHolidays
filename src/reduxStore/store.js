import { configureStore } from '@reduxjs/toolkit'
import trekkingReducer from './trekkingSlice'
import languageReducer from './languageSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    trekking: trekkingReducer,
    language: languageReducer,
    filter: filterReducer
  },
})