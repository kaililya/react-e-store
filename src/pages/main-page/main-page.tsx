import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchGoods } from '../../services/thunks/thunks';
import { TailSpin } from "react-loader-spinner";
import styles from './main-page.module.css'
import Slider from '../../components/slider/slider';
import CategoriesGrid from '../../components/categories-grid/categories-grid';


const MainPage = ():JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGoods())
  },[dispatch]);
  
  const data = useAppSelector(store => store.goodsReducer.goods);
  const isLoading = useAppSelector(store => store.goodsReducer.isLoading);

  if (!data) {
    return <p>no data</p>;
  } else {
  }
  
  return (
    <div className={styles.main_container}>
      {isLoading ? (
      <TailSpin wrapperClass={styles.spinner} color='black' />
      ) : (
        <>
         <Slider data={data} />
         <CategoriesGrid data={data} /> 
       </>
      )}
    </div>
  )
}

export default MainPage