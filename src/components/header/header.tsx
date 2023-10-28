import styles from './header.module.css';
import logo_image from '../../images/icons/logo.png';
import search_image from '../../images/icons/search_icon.png';
import login_image from '../../images/icons/login_icon.png';
import cart_image from '../../images/icons/cart_icon.png';
import React, { useState } from 'react'

import { NavLink } from 'react-router-dom';
import Logo from '../../ui/logo/logo';
import { useAppSelector } from '../../hooks/redux-hooks';
import CartPage from '../../pages/cart-page/cart-page';

function Header() {
  // проблема со сбросом классов в switchClassName
  const switchClassName = ({isActive}:{isActive:boolean}): string => (isActive ? `${styles.link_active}` : `${styles.link}`);

  const { goodsArray } = useAppSelector(store => store.cardReducer)

  const quantityUniqueGood = React.useMemo(() => {
    return goodsArray.map((item:any) => item.id_).length
  }, [goodsArray])
  
  const [first, setfirst] = React.useState(false)

  const refW = React.useRef<any>('');

  const handleCloseCart = (event:any) => {
    try {   
      const path = event.path || (event.composedPath());
      if (path.includes(refW.current)) {
        setfirst(prev => !prev)}
    } catch {
      
    }
    }

  React.useEffect(() => {
    document.addEventListener("click", handleCloseCart);
  
    return () => {
      document.removeEventListener("click", handleCloseCart);
    }
  }, [])
  
 

  return (
    <header className={styles.header}>
      <div className={styles.header_wrapper}>
      {/* ${styles.burger_icon_active} */}
        <button className={`${styles.burger_icon}  `}>
          <span className={styles.burger_span}></span>
        </button>
        <div className={styles.fff}>
          <Logo/>
        </div>

        <nav className={styles.nav_container}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <NavLink className={switchClassName} to='/'>Home</NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink className={switchClassName} to='/goods'>Shop</NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink className={switchClassName} to='/goods'>Product</NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink className={switchClassName} to='/goods'>Pages</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.right_nav_container}>
          <NavLink className={switchClassName} to='profile'> <img className={styles.right_nav_image} src={login_image} alt="login image" /></NavLink>
          {/* <NavLink className={switchClassName} to=''> */}
            <img onClick={() => setfirst(prev => !prev)} className={styles.right_nav_image} src={cart_image} alt="login image" />
          {/* </NavLink> */}
            <div className={styles.curcle}>
              {quantityUniqueGood < 1 ? (
              <span className={styles.number_goods}>N</span>) :
              (<span className={styles.number_goods}>{quantityUniqueGood}</span>)}
            </div>
          {first && (
            <div
              ref={refW}
              // onClick={handleCloseCart} 
              className={styles.cart_wrapper}>
             <CartPage/>
            </div>
          )}   
        </div> 
      </div>  
    </header>
  )
}

export default Header