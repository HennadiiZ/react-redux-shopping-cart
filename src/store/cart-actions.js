
import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-redux-e4c1d-default-rtdb.firebaseio.com/cart.json');
      
      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
    //   dispatch(cartActions.replaceCart(cartData));
    dispatch(cartActions.replaceCart({
      items: cartData.items || [],
      totalQuantity: cartData.totalQuantity
    }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',  
        message: 'Fetching cart data failed',
      }));
    }
  };
};

const sendCartData = (cart) => {
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

export default sendCartData;