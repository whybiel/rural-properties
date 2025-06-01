import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Producer } from './types';
import { mockProducers } from '../../mocks/produtores'

interface ProducerState {
  producers: Producer[];
}

const initialState: ProducerState = {
  producers: mockProducers,
};

const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload);
    },
    removeProducer: (state, action: PayloadAction<string>) => {
      state.producers = state.producers.filter(p => p.id !== action.payload);
    },
    updateProducer: (state, action: PayloadAction<Producer>) => {
      const index = state.producers.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.producers[index] = action.payload;
      }
    },
  },
});

export const { addProducer, removeProducer, updateProducer } = producerSlice.actions;
export default producerSlice.reducer;

