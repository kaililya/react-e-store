import React, { useEffect } from 'react'
import Slider from '../../components/slider/slider'
import CategoriesGrid from '../../components/categories-grid/categories-grid'
import ArrivalsCarousel from '../../components/arrivals-carousel/arrivals-carousel'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchGoods } from '../../services/thunks/ActionCreators';

function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGoods())

  },[dispatch])
  
  const data = useAppSelector(store => store.goodsReducer.goods);

  if (!data) {
    return <p>no data</p>;
  } else {
    // console.log(data)
  }
  return (
    <>
      <Slider data={data} />
      <CategoriesGrid data={data} />
    </>
  )
}

export default MainPage