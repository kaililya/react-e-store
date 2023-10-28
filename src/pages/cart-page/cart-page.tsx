import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { CartItem } from '../../components/cart-item/cart-item';
import { clearCart } from '../../services/slices/card-slice';
import styles from './cart-page.module.css'
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const goodsArray = useAppSelector(store => store.cardReducer.goodsArray);

  // console.log(goodsArray)

  const handelClickClearCart = () => {

    dispatch(clearCart())
  };

  return (
      <div className={styles.main_container}>
        <h2 className={styles.cart_title}>Cart</h2>
          {goodsArray.length === 0 && (
            <>
              <p className={styles.cart_state} >Cart is Empty</p>
              <Link to='/goods'>
                <button className={`${styles.clear_button} ${styles.clear_button__to_store}`} onClick={handelClickClearCart} type='button'>Store</button>
              </Link>
            </>
          )}
          <ul className={styles.cart_item_container}>
            {goodsArray.map((item:any) => (
              <CartItem key={item.id_} item={item} />
            ))}
          </ul>
          {goodsArray.length !== 0 && (
            <button className={styles.clear_button} onClick={handelClickClearCart} type='button'>CLEAR CART</button>
          )}
        

      </div>
  );
};

export default CartPage