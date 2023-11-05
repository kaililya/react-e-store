import styles from './logo.module.css'
import logo_image from '../../images/icons/logo.png';
import { Link } from 'react-router-dom';
import { mainPATH } from '../../utils/constants';

function Logo() {
  return (
    <Link to={mainPATH} className={styles.logo_container}>
      <img className={styles.logo} src={logo_image} alt="logo" />
      <h3 className={styles.title}>Nayzak</h3>
    </Link>
  )
}

export default Logo