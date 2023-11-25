import React from 'react'
import styles from './slider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { TGood } from '../../types/types';
import { goodsPATH } from '../../utils/constants';

type TSlider = {
  data: TGood[]
}

const Slider = ({ data }: TSlider):JSX.Element=> {

  const photoBasketballCategory = React.useMemo(() => {
    try {
      return data[5].photos[0].blue[0]
    } catch (error) {
      
    }
  }, [data])

  
  const photoFootballCategory = React.useMemo(() => {
    try {
      return data[6].photos[0].white[0]
    } catch (error) {
      
    }
  }, [data])


  return (
    <section>
      <Swiper
        // @ts-ignore
      direction={'vertical'}
      slidesPerView={1}
      spaceBetween={100}
      mousewheel={true}
      pagination={{
        clickable: true,
      }}
      modules={[ Pagination ]}
      className={`mySwiper ${styles.wrapper}`}
    >
      <SwiperSlide>
        <div className={styles.slide_container}>
          <img className={styles.slide_image} src={photoFootballCategory} alt=' '/>
          <h3 className={styles.title}>Lets play football</h3>
          <p className={styles.description}>Effective running and excellent dribbling</p>
          <Link to={`${goodsPATH}?type=football`}>
            <button className={styles.link} >Explore</ button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide> 
        <div className={styles.slide_container}>
          <img className={styles.slide_image} src={photoBasketballCategory} alt=' '/>
          <h3 className={styles.title} >Time for cross</h3>
          <p className={styles.description}>Run longer and even more comfortably</p>
          <Link to={`${goodsPATH}?type=running`}>
            <button className={styles.link} >Explore</ button>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  )
}
export default Slider