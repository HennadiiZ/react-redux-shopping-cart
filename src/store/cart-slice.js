import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {counter: 0, showCounter: false};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    increment(state, action) {
      state.counter++;
    },
    decrement(state, action) {
      state.counter--;
    },
    increse(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state, action) {
      state.showCounter = !state.showCounter
    }
  }
});

export const cartActions = cartSlice.actions; // Array of actions  - increment(), decrement() and so on

// export default cartActions.reducer;
export default cartSlice;