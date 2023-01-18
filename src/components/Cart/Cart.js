import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';

const Cart = (props) => {

  const cartItems = useSelector(state => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>

        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}

        {cartItems.map(item => (
          <CartItem
            item={{ 
              title: item.name, 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price 
            }}
            key={item.id.toString()}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
