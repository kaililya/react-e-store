import styles from './footer.module.css';
import { Link, useLocation } from 'react-router-dom';
import facebook_icon from '../../images/icons/facebook_icon.png';
import instagram_icon from '../../images/icons/instagram_icon.png';
import twiter_icon from '../../images/icons/twiter_icon.png';
import email_icon from '../../images/icons/email_icon.png';
import usa_flag from '../../images/icons/usa-flag.png';
import { faqPATH, goodsPATH, mainPATH, profilePATH, subscribeAlertPATH } from '../../utils/constants';

const Footer = ():JSX.Element => {
  const location = useLocation();
  return (
    <footer className={styles.footer}>
      <div className={styles.main_container}>
        <div className={styles.upper_row_container}>
          <div className={styles.subscibe_container}>
            <h3 className={styles.subscibe_container__title}>Join newsletter</h3>
            <p className={styles.subscibe_container__description}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</p>
            <form className={styles.form_subscribe}>
              <input 
                className={styles.input}
                type="email"
                placeholder='Your email'
                required/>
              <Link
                to={subscribeAlertPATH}
                state={{ background: location }}
                >
                  <button className={styles.form_button} type='submit'>
                   Subscribe
                  </button>
              </Link>
            </form>
          </div>
          <div className={styles.navigation_container}>
            <div className={styles.navigation_container__column}>
              <ul className={styles.links_container}>
              <li className={styles.links_container__item}>
                  <Link className={styles.link} to={mainPATH}>Home</Link>
                </li>
                <li className={styles.links_container__item}>
                  <Link className={styles.link} to={goodsPATH}>Shop</Link>
                </li>
                <li className={styles.links_container__item}>
                  <Link className={styles.link} to={profilePATH}>Profile</Link>
                </li>

                <li className={styles.links_container__item}>
                  <Link className={styles.link} to={faqPATH}>FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.lower_row_container}>
          <ul className={styles.social_media_container}>
            <li className={styles.circle_figure}>
              <a className={styles.social_media__link} href="facebook page">
                <img className={styles.social_media__image} src={facebook_icon} alt="facebook icon" />
              </a>
            </li>
            <li className={styles.circle_figure}>
              <a className={styles.social_media__link} href="instagram">
                <img className={styles.social_media__image} src={instagram_icon} alt="instagram icon" />
              </a>
            </li>
            <li className={styles.circle_figure}>
              <a className={styles.social_media__link} href="twiter">
                <img className={styles.social_media__image} src={twiter_icon} alt="twiter icon" />
              </a>
            </li>
            <li className={styles.circle_figure}>
              <a className={styles.social_media__link} href="email">
                <img className={styles.social_media__image} src={email_icon} alt="email icon" />
              </a>
            </li>
          </ul>
          <div className={styles.mode_container}>
            <div className={styles.language_container}>
             <p className={styles.country_name}>English</p>
             <img className={styles.country_flag} src={usa_flag} alt="country language" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer