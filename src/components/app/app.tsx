import styles from "./app.module.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import ErrorPage from "../../pages/error-page/error-page";
import MainPage from "../../pages/main-page/main-page";
import AboutPage from "../../pages/about-page/about-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/fortgot-password-page/fortgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import React from 'react'
import { useAppDispatch} from "../../hooks/redux-hooks";
import { checkUserAuth } from "../../utils/api";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import GoodItemPage from "../../pages/good-item-page/good-item-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import GoodsPage from "../../pages/goods-page/goods-page";
import Modal from "../modal/modal";
import CartPage from "../cart/cart";
import SubscribeAlert from "../subscribe-alert/subscribe-alert";
import { cartPATH, errorPATH, faqPATH, forgotPasswordPATH, goodsNamePATH, goodsPATH, loginPATH, mainPATH, profilePATH, registerPATH, resetPasswordPATH, subscribeAlertPATH } from "../../utils/constants";

const App = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Header/>
        <Routes location={background || location}>
          <Route path={mainPATH} element={<MainPage />}/>
          <Route path={faqPATH} element={<AboutPage />}/>
          <Route path={loginPATH} element= {<OnlyUnAuth component={<LoginPage />}/>} />
          <Route path={registerPATH} element= {<OnlyUnAuth component={<RegisterPage />}/>}/>
          <Route path={forgotPasswordPATH} element= {<OnlyUnAuth component={<ForgotPasswordPage />}/>} />
          <Route path={resetPasswordPATH} element= {<OnlyUnAuth component={<ResetPasswordPage />}/>} />
          <Route path={profilePATH} element= {<OnlyAuth component={<ProfilePage />}/>} />
          <Route path={goodsPATH} element={<GoodsPage/>}/>
          <Route path={goodsNamePATH} element={<GoodItemPage/>}></Route>
          <Route path={errorPATH} element={<ErrorPage />}/>
        </Routes>
        {background && (
        <Routes> 
          <Route path={subscribeAlertPATH}element={
           <Modal>
              <SubscribeAlert/> 
           </Modal>}/>
           <Route path={cartPATH} element={
           <Modal>
              <CartPage /> 
           </Modal>}/>
         </Routes>
         )}
        <Footer />
      </div>
    </div>
  )
}

export default App