import React from 'react'
import styles from '../login-page/login-page.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { useNavigate } from 'react-router';
import { fetchForgotPasswordThunk } from '../../services/thunks/thunks';
import { TailSpin } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { MdDone } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';
import { inputsForgotPasswordPage, loginPATH, registerPATH, resetPasswordPATH } from '../../utils/constants';

const ForgotPasswordPage = ():JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { forgotPasswordRequest, forgotPasswordRequestSuccess, forgotPasswordRequestFailed} = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    email: '',
  });

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();
    dispatch(fetchForgotPasswordThunk(userData.email));
  };

  React.useEffect(() => {
    if (forgotPasswordRequestSuccess) {
      const timer = setTimeout(() => navigate(resetPasswordPATH, { replace: true }), 3000);
    }
  
  }, [forgotPasswordRequestSuccess]);

  return (
    <div className={styles.wrapper}>
    <section className={`${styles.main_container}`}>
      <h2 className='text text_type_main-medium mb-6'>FORGOT PASSWORD</h2>
      <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
        {inputsForgotPasswordPage.map((input, index) => (
          <Input 
          {...input} 
          key={index} 
          // @ts-ignore
          value={userData[input.name]} 
          onChange={hadleChangeUserData}
          />
        ))}
        {forgotPasswordRequest && (
          <TailSpin color="black" radius={"2px"} />
        )}
        {forgotPasswordRequestFailed && (
          <>
          <ImCancelCircle color='#E25563' size='42px' />
          <p className={styles.server_message}>Occured unknow error. Please try later</p>
          </>
        )}
        {forgotPasswordRequestSuccess && (
          <>
            <MdDone color='#20C997' size='42px'/>
            <p className={styles.server_message}>We send ver. code on your mail</p>
          </>
        )}
        <button className={styles.submit_button} type="submit">Send</button>
      </form>
      <ul className={`${styles.links_container}`}>
        <li className={`${styles.links_row}`}>
          <Link to={loginPATH} className={styles.link_description}> 
            Log in
          </Link>
        </li>
        <li className={`${styles.links_row}`}>
          <Link to={registerPATH} className={styles.link_description}> 
            Registration
          </Link>
        </li>
      </ul>
    </section>
  </div>
  )
}

export default ForgotPasswordPage