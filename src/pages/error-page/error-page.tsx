import styles from './error-page.module.css'
import { Link } from 'react-router-dom'
import { mainPATH } from '../../utils/constants'

const ErrorPage = ():JSX.Element => {
  return (
    <div className={styles.main_container}>
      <h2 className={styles.title}>404 – Page not found</h2>
      <p className={styles.sub_title}>The page you're looking for isn't available.Try to search again or use the go back button below.</p>
      <Link to={mainPATH}>
        <button className={styles.button} type='button'>Go back home</button>
      </Link>
    </div>
  )
}

export default ErrorPage