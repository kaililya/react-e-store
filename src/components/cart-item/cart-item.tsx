import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { decreaseCount, increaseCount, removeGoodFromCart } from '../../services/slices/card-slice';
import styles from './cart-item.module.css'
import { MdDelete } from 'react-icons/md';
import styles_good_item from '../good-item/good-item.module.css'

export const CartItem = ({item}:any) => {
  console.log(item);
  const dispatch = useAppDispatch();

  const handleClickIncreseQuantity = () => {
    dispatch(increaseCount(item))
  };

  const handleClickIDecreseQuantity = () => {
    dispatch(decreaseCount(item))
  };

  const handleClickRemoveItem = (e:any) => {
    e.stopPropagation()

    // if (window.confirm('Ты действительно хочешь удалить товар?')) {
    //   dispatch(removeItem(id));
    // }
    dispatch(removeGoodFromCart(item))
  };

  // const currentColor = item.photos[0].color[0];

  return (
    <article className={`${styles_good_item.good_wrapper} ${styles_good_item.good_wrapper__horizontal}`}>
      <img className={styles.good_image} src={item.photo[0]} alt="" />
      <div className={styles_good_item.additional_wrapper}>
        <h3 className={styles_good_item.good_title}>{item.name}</h3>
        <p className={styles_good_item.good_price}><span className={styles_good_item.bold_span} >Price: </span>{item.price}$</p>
        <p className={styles_good_item.good_price}><span className={styles_good_item.bold_span}>Size: </span>{item.size}</p>
        <p className={styles_good_item.good_price}><span className={styles_good_item.bold_span}>Color: </span>{item.color}</p>
        <p className={styles_good_item.good_price}><span className={styles_good_item.bold_span} >Count: </span>{item.count}</p>

        <button className={styles.count_button} onClick={handleClickIDecreseQuantity}  type="button">-</button>
        <button className={styles.count_button} onClick={handleClickIncreseQuantity} type="button">+</button>
        <button className={styles.delete_item_button} onClick={handleClickRemoveItem} type="button"><MdDelete color={'rgba(226, 85, 99, 1)'}/></button>
      </div>
    </article>


    // <li className={styles.main_container}>
    //   <p className={styles.name}>Name:{item.name}</p>
    //   <p className={styles.size}>Size: {item.size}</p>
    //   <p className={styles.color}>Color: {item.color}</p>
    //   <p className={styles.count}>Count: {item.count}</p>
    //   
    // </li>
  );
};