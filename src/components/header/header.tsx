import styles from './header.module.css';
import login_image from '../../images/icons/login_icon.png';
import cart_image from '../../images/icons/cart_icon.png';
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../../ui/logo/logo';
import { useAppSelector } from '../../hooks/redux-hooks';
import { cartPATH, faqPATH, goodsPATH, mainPATH, profilePATH } from '../../utils/constants';

const Header = ():JSX.Element => {

  const location = useLocation();
  const [isBurger, setIsBurger] = useState<boolean>(false);

  const switchClassName = ({isActive}:{isActive:boolean}): string => (isActive ? `${styles.link_active} ${styles.link}` : `${styles.link}`);

  const { goodsArray } = useAppSelector(store => store.cardReducer);

  const quantityUniqueGood = React.useMemo<number>(() => {
    return goodsArray.map((item) => item.id_).length
  }, [goodsArray]);
   
  const handleOpenMenu = () => {
   setIsBurger(prev => !prev);
  };

  const handleRoute = () => {
   if (isBurger) {
     setIsBurger(false)
    } else {

   }
  };

  return (
    <header
      className={isBurger ? `${styles.header_burger}`:`${styles.header}`}>
      <div className={styles.header_wrapper}>
        <button 
          className={isBurger ? `${styles.burger_icon} ${styles.burger_icon_active}` : `${styles.burger_icon}` }
          onClick={handleOpenMenu}
        >
          <span className={styles.burger_span}></span>
        </button>
        <div className={styles.fff}>
          <Logo/>
        </div>
        <nav 
          className={isBurger ? `${styles.nav_container} ${styles.nav_container_burger}` : `${styles.nav_container}`}
        >
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <NavLink
                className={switchClassName}
                onClick={handleRoute}
                to={mainPATH}>Home</NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink 
                className={switchClassName}
                onClick={handleRoute} 
                to={goodsPATH}>Shop</NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                 className={switchClassName}
                 onClick={handleRoute} 
                 to={faqPATH}
              >FAQ</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.right_nav_container}>
          <NavLink className={switchClassName} to={profilePATH}>
            <img className={styles.right_nav_image} src={login_image} alt=" " />
          </NavLink>
          <Link
            to={cartPATH}
            state={{ background: location }}
          >
            <img className={styles.right_nav_image} src={cart_image} alt=" " />
          </Link>
            
            <div className={styles.curcle}>
              {quantityUniqueGood < 1 ? (
              <span className={styles.number_goods}>N</span>) :
              (<span className={styles.number_goods}>{quantityUniqueGood}</span>)}
            </div>
        </div> 
      </div>  
    </header>
  )
}

export default Header