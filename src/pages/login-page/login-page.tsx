import React from 'react'
import styles from './login-page.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { fetchLoginThunk } from '../../services/thunks/thunks';
import { TailSpin } from "react-loader-spinner";
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { MdDone } from 'react-icons/md';
import {ImCancelCircle} from 'react-icons/im';
import { forgotPasswordPATH, inputsLoginPage, registerPATH } from '../../utils/constants';

const LoginPage = ():JSX.Element => {

  const dispatch = useAppDispatch();

  const { loginingRequest, loginingRequestSuccess, error } = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    email: '',
    password: '',
  });

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();
   
    dispatch(fetchLoginThunk(userData.email,  userData.password));
  };

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.main_container}`}>
        <h2 className='text text_type_main-medium mb-6'>LOG IN</h2>
        <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
          {inputsLoginPage.map((input, index) => (
            <Input 
            {...input} 
            key={index} 
            // @ts-ignore
            value={userData[input.name]} 
            onChange={hadleChangeUserData}
            />

          ))}
          {loginingRequest && (
            <TailSpin color="black" radius={"2px"} />
          )}
          {loginingRequestSuccess && (
            <>
            <MdDone color='#20C997' size='42px'/>
            <p className={styles.server_message}>Logining success</p>
            </>
          )}
          {error && (
            <>
              <ImCancelCircle color='#E25563' size='42px' />
              <p className={styles.server_message}>{error}</p>
            </>
          )}
          <button className={styles.submit_button} type="submit">LOG IN</button>
        </form>
        <ul className={`${styles.links_container}`}>
          <li className={`${styles.links_row}`}>
            <Link to={registerPATH} className={styles.link_description}> 
              Are you a new user?
            </Link>
          </li>
          <li className={styles.links_row}>
            <Link to={forgotPasswordPATH} className={styles.link_description}>
              Forgot your password?
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default LoginPage