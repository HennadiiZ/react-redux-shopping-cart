import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { sendCartData } from './store/cart-slice';
// import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    // const sendCartData = async () => {
    //   // dispatch(uiActions.showNotification({
    //   //   status: 'pending',
    //   //   title: 'Sending...',  
    //   //   message: 'Sending cart data!',
    //   // }));

    //   // const response = await fetch(
    //   //     'https://react-redux-e4c1d-default-rtdb.firebaseio.com/cart.json', 
    //   //   { 
    //   //     method: 'PUT', 
    //   //     body: JSON.stringify(cart) 
    //   //   }
    //   // );

    //   // if (!response.ok) {
    //   //   throw new Error('Sending cart data failed.');
    //   // }

    //   // dispatch(uiActions.showNotification({
    //   //   status: 'success',
    //   //   title: 'Success!',  
    //   //   message: 'Sent cart data successfully!',
    //   // }));
    // };

    // if ( isInitial ) {
    //   isInitial = false;
    //   return;
    // }

    // sendCartData().catch((error) => {
    //   // dispatch(uiActions.showNotification({
    //   //   status: 'error',
    //   //   title: 'Error!',  
    //   //   message: 'Sending cart data failed',
    //   // }));
    // });
      if ( isInitial ) {
        isInitial = false;
        return;
      }

      dispatch(sendCartData(cart));

  }, [cart, dispatch]);

  return (
    <>
    { notification && <Notification status={notification.status} title={notification.title} message={notification.message} /> }
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
