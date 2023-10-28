import React from 'react'
import styles from './good-item.module.css'
// TODO
// вынести horizontal в константу

function GoodItem({data, goodDisplayState}:any) {

  const firstColor = Object.keys(data.photos[0])[0];
  // console.log(Object.keys(data.photos[0]))

  if (!data) {
    return null
  }


  return (
    <li className={styles.good_main_container}>
        {goodDisplayState === 'default' ? (      
        <article className={styles.good_wrapper}>
           <div className={styles.image_wrapper}>
            <img className={styles.good_image} src={data.photos[0][firstColor][0]} alt="" />
          </div>
          <h3 className={styles.good_title}>{data.name}</h3>
          <p className={styles.good_price}>${data.price}</p>
        </article>   
        ) : (
        <article className={`${styles.good_wrapper} ${styles.good_wrapper__horizontal}`}>
          <div className={styles.image_wrapper}>
            <img className={styles.good_image} src={data.photos[0][firstColor][0]} alt="" />
          </div>
          <div className={styles.additional_wrapper}>
            <h3 className={styles.good_title}>{data.name}</h3>
            <p className={styles.good_price}><span className={styles.bold_span} >Price: </span>{data.price}$</p>
            <p className={styles.good_price}><span className={styles.bold_span}>Sex: </span>{data.sex}</p>
            <p className={styles.good_price}><span className={styles.bold_span}>Type: </span>{data.type}</p>
          </div>
          <p className={styles.good_description}>{data.description}</p>
         </article>
        )}
    </li>
  )
}

export default GoodItem