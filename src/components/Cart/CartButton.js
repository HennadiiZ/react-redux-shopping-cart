import classes from './CartButton.module.css';

import { useSelector, useDispatch } from 'react-redux';

// import { cartSlice } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  const itemsAmount = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsAmount}</span>
    </button>
  );
};

export default CartButton;
