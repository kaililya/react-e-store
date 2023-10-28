import React from 'react'
import styles from './good-display.module.css'

// TODO
// 1) Добавить кнопкам hover
// 2) Добавить класс активной кнопке (например сделать темнее background color)

function GoodDisplay(props: any) {
  return (
    <div className={styles.main_container}>
      
      <button
              className={props.goodDisplayState !== 'horizontal' ? `${styles.burger_menu__active} ${styles.burger_menu} ${styles.burger_menu_2}` :`${styles.burger_menu} ${styles.burger_menu_2}`}
        onClick={() => props.setGoodDisplayState('default')}
        >
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
        <span className={`${styles.burger_line} ${styles.burger_line_2}`}></span>
      </button>
      <button 
        className={props.goodDisplayState === 'horizontal' ? `${styles.burger_menu__active} ${styles.burger_menu}` :`${styles.burger_menu}`}
        onClick={() => props.setGoodDisplayState('horizontal')}
        >
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
      </button>
    </div>
  )
}

export default GoodDisplay