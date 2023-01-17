import { createSlice } from '@reduxjs/toolkit';

// const initialUIState = {cartIsVisible: false};

const uiSlice = createSlice({
  name: 'ui',
//   initialState: initialUIState,
  initialState: {cartIsVisible: false},
  reducers: {
    toggle(state, action) {
      state.cartIsVisible = !state.cartIsVisible;
    }
  }
});

export const uiActions = uiSlice.actions; // Array of actions  - toggle() and so on

// export default uiSlice.reducer;
export default uiSlice;