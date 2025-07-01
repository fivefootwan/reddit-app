import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './resultsSlice';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});
