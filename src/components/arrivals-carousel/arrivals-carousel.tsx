import styles from './arrivals-carousel.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchGoods } from '../../services/thunks/ActionCreators';
import { Link } from 'react-router-dom';
import GoodItem from '../good-item/good-item';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/effect-coverflow';

import 'swiper/css/pagination';
import 'swiper/css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

function ArrivalsCarousel() {

  
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchGoods())

  },[dispatch])
  
  const data = useAppSelector(store => store.goodsReducer.goods);

  const photoLifeStleCategory = React.useMemo(() => {
    try {
      return data[1].photos[0].white[0]
    } catch (error) {
      
    }
    
  }, [data])

  const photoFemaleCategory = React.useMemo(() => {
    try {
      return data[0].photos[0].pink[3]
    } catch (error) {
      
    }
  }, [data])

  const photoMaleCategory = React.useMemo(() => {
    try {

      return data[3].photos[0].black[1]

    } catch (error) {
      
    }
  }, [data])

  console.log(data);

  if (!data) {
    return <p>no data</p>;
  } else {
    // console.log(data)
  }

  return (
    <section className={styles.main_container}>

  </ section>
    // <section className={styles.main_container}>
    //   <h2 className={styles.title}>New Arrivals</h2>
    //   <div className={styles.items_container}>
    //   {data.map((good) => (
    //       <Link className={styles.link} to='/good/id'>
    //         <GoodItem data={good} key={good.id} goodDisplayState={'default'}/>
    //       </Link>)
    //       )}
    //   </div>
    // </section>
  )
}

export default ArrivalsCarousel