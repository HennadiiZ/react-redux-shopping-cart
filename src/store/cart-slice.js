import { createSlice } from '@reduxjs/toolkit';
// import { uiActions } from './ui-slice';
import sendCartData from './cart-actions';

const initialCartState = {
  items: [], 
  totalQuantity: 0, 
  // totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    //
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    // 
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log('item', newItem);

      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        // state.items.push(newItem); 
        // concat
        state.items.push({
          id: newItem.id, 
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        }); 
      } else {
        existingItem.quantity++;        
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      console.log('remove-item', id);

      const existingItem = state.items.find(item => item.id === id);

      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      }else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
     
    }
  }
});

export const fetchCartData = (cart) => {} //

// sendCartData();

export const cartActions = cartSlice.actions; // Array of actions  - increment(), decrement() and so on

// export default cartActions.reducer;
export default cartSlice;