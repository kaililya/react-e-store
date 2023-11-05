import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { decreaseCount, increaseCount, removeGoodFromCart } from '../../services/slices/card-slice';
import styles from './cart-item.module.css'
import { MdDelete } from 'react-icons/md';
import styles_good_item from '../good-item/good-item.module.css'
import { TCartItem } from '../../types/types';

export type TCartItemProps = {
  item: TCartItem;
}

export const CartItem = ({ item }:TCartItemProps):JSX.Element => {
  
  const dispatch = useAppDispatch();

  const handleClickIncreseQuantity = () => {
    dispatch(increaseCount(item));
  };

  const handleClickIDecreseQuantity = () => {
    dispatch(decreaseCount(item));
  };

  const handleClickRemoveItem = (e:React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeGoodFromCart(item));
  };

  return (
    <article className={`${styles.good_wrapper__horizontal} ${styles_good_item.good_wrapper} ${styles_good_item.good_wrapper__horizontal}`}>
      <img className={styles.good_image} src={item.photo[0]} alt={item.name} />
      <div className={styles_good_item.additional_wrapper}>
        <h3 className={styles_good_item.good_title}>{item.name}</h3>
        <p className={styles_good_item.good_price}>
          <span className={styles_good_item.bold_span}>Price: </span>{item.price}$
        </p>
        <p className={styles_good_item.good_price}>
          <span className={styles_good_item.bold_span}>Size: </span>{item.size}
        </p>
        <p className={styles_good_item.good_price}>
          <span className={styles_good_item.bold_span}>Color: </span>{item.color}
        </p>
        <p className={styles_good_item.good_price}>
          <span className={styles_good_item.bold_span}>Count: </span>{item.count}
        </p>
        <button 
         className={styles.count_button}
         onClick={handleClickIDecreseQuantity}
         type="button">
          -
        </button>
        <button className={styles.count_button}
         onClick={handleClickIncreseQuantity} 
         type="button">
          +
        </button>
        <button className={styles.delete_item_button}
         onClick={handleClickRemoveItem} 
         type="button">
          <MdDelete color={'rgba(226, 85, 99, 1)'}/>
         </button>
      </div>
    </article>
  );
};