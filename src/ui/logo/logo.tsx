import styles from './logo.module.css'
import logo_image from '../../images/icons/logo.png';

function Logo() {
  return (
    <div className={styles.logo_container}>
      <img className={styles.logo} src={logo_image} alt="logo" />
      <h3 className={styles.title}>Nayzak</h3>
    </div>
  )
}

export default Logo