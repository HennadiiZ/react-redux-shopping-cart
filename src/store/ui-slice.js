import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {cartIsVisible: false, notification: null},
  reducers: {
    toggle(state, action) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = { 
        status: action.payload.status,
        title: action.payload.title,  
        message: action.payload.message,
      };
    }
  }
});

export const uiActions = uiSlice.actions; // Array of actions  - toggle() and so on

// export default uiSlice.reducer;
export default uiSlice;