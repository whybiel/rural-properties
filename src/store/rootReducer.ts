import { combineReducers } from '@reduxjs/toolkit';
import producerSlice from '../features/producer/slice';

const rootReducer = combineReducers({
  producer: producerSlice,
});

export default rootReducer;