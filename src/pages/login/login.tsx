import React from 'react'
import styles from './login.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { fetchLoginThunk } from '../../services/thunks/ActionCreators';
import { TailSpin } from "react-loader-spinner";
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { MdDone } from 'react-icons/md';
import {ImCancelCircle} from 'react-icons/im';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loginingRequest, loginingRequestSuccess, error } = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    email: '',
    password: '',
  });

  const inputsLoginPage = [
    {
      name:"email",
      type:"email",
      placeholder: "Email",
      errorMessage:"Email shoud be valid",
      label:"Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password shoud be more then 6 characters and shoudn't include any special character",
      label: "Password",
      required: true,
      pattern: "^[A-Za-z0-9]{6,1000}"
    }
  ]

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();
   
    dispatch(fetchLoginThunk(userData.email,  userData.password));
  };

  // React.useEffect(() => {
  //   if (loginingRequestSuccess){
  //     const { from } = location.state || { from: { pathname: "/" } };

  //     const timer = setTimeout(() => navigate(from),3000)
  //   }
  
  // }, [loginingRequestSuccess])


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
          <Link to='/register' className={styles.link_description}> 
            Are you a new user?
          </Link>
        </li>
        <li className={styles.links_row}>
          <Link to='/forgot-password' className={styles.link_description}>
            Forgot your password?
          </Link>
        </li>
      </ul>
    </section>
  </div>
  )
}

export default LoginPage