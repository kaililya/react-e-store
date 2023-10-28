import styles from "./app.module.css";
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import Goods from '../../pages/goods/goods';
import ErrorPage from "../../pages/error-page/error-page";
import MainPage from "../../pages/main-page/main-page";
import AboutPage from "../../pages/about-page/about-page";
import LoginPage from "../../pages/login/login";

import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/fortgot-password-page/fortgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
// import imge from '../../images/shoes/goods/nike-air-force/white.webp'

import React from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchLogoutThunk, fetchResetPasswordThunk } from "../../services/thunks/ActionCreators";
import { checkUserAuth } from "../../utils/api";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import GoodItemPage from "../../pages/good-item-page/good-item-page";
import ProfilePage from "../../pages/profile/profile";
import GoodsPage from "../../pages/goods/goods";

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation();
  const background = location.state && location.state.background;
  const { userData } = useAppSelector(store => store.userReducer)

  React.useEffect(() => {
    dispatch(checkUserAuth())

  }, [dispatch]);
  
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        {/* <Header /> */}
        <Routes location={background || location}>
          <Route path='/' element={<MainPage />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path="/login" element= {<OnlyUnAuth component={<LoginPage />}/>} />
          <Route path="/register" element= {<OnlyUnAuth component={<RegisterPage />}/>}/>
          <Route path="/forgot-password" element= {<OnlyUnAuth component={<ForgotPasswordPage />}/>} />
          <Route path="/reset-password" element= {<OnlyUnAuth component={<ResetPasswordPage />}/>} />
          <Route path='/profile' element= {<OnlyAuth component={<ProfilePage />}/>} />
          <Route path='/goods' element={<GoodsPage/>}/>
          <Route path="/goods/:name" element={<GoodItemPage/>}></Route>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
        {/* <h1>{isUserAuth}</h1> */}

        {/* <GoodItemPage /> */}
        {/* <CartPage /> */}
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App