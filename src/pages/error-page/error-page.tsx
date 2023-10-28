import React from 'react'
import styles from './error-page.module.css'
import error_page_icon from '../../images/icons/error_page_icon.png'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className={styles.main_container}>
      <img className={styles.error_image} src={error_page_icon} alt="error page icon" />
      <h2 className={styles.title}>404 – Page not found</h2>
      <p className={styles.sub_title}>The page you're looking for isn't available.Try to search again or use the go back button below.</p>
      <Link to='/'>
      <button className={styles.button} type='button'>Go back home</button>
      </Link>
    </div>
  )
}

export default ErrorPage