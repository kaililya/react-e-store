import React from 'react'
import styles from './slider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
// import nike_shoes_image_1 from '../../images/shoes/banners/nike-shoes-1.jpg'
// import nike_shoes_image_2 from '../../images/shoes/banners/nike-shoes-2.jpg'
// import nike_shoes_image_4 from '../../images/shoes/banners/nike-shoes-4.jpg'
import 'swiper/css/pagination';
import 'swiper/css';



function Slider({data}:any) {

  console.log(data)
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
      spaceBetween={2}
      mousewheel={true}
      pagination={{
        clickable: true,
      }}
      modules={[ Pagination]}
      className={`mySwiper ${styles.wrapper}`}
    >
      <SwiperSlide>
        <div className={styles.slide_container} >
          <img className={styles.slide_image} src={photoFootballCategory} alt="" />
          <h3 className={styles.title} >Lets play football</h3>
          <p className={styles.description}>Effective running and excellent dribbling</p>
          <button className={styles.link} >Explore</ button>
        </div>
      </SwiperSlide>
      <SwiperSlide> 
        <div className={styles.slide_container}>
          <img className={styles.slide_image} src={photoBasketballCategory} alt="" />
          <h3 className={styles.title} >Time for cross</h3>
          <p className={styles.description}>Run longer and even more comfortably</p>
          <button className={styles.link}>Explore</ button>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  )
}

export default Slider