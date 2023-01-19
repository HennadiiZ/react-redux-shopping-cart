import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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

export const sendCartData = (cart) => {
  // return { type: '', payload: ... }; // actions - // I did not do it before because toolkit creates these action creators automatically for me for all those reducer methods
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',  
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
          'https://react-redux-e4c1d-default-rtdb.firebaseio.com/cart.json', 
        { 
          method: 'PUT', 
          body: JSON.stringify(cart) 
        }
      );
  
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',  
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',  
        message: 'Sending cart data failed',
      }));
    }
  }
};

export const cartActions = cartSlice.actions; // Array of actions  - increment(), decrement() and so on

// export default cartActions.reducer;
export default cartSlice;