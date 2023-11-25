import React from 'react'
import styles from '../login-page/login-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { fetchRegisterThunk } from '../../services/thunks/thunks';
import { TailSpin } from "react-loader-spinner";
import { MdDone } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';
import { inputsRegisterPage, loginPATH } from '../../utils/constants';

const RegisterPage = ():JSX.Element => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registrationRequest, registrationRequestSuccess, error } = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    email: '',
    name:'',
    password: '',
  });

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();
    dispatch(fetchRegisterThunk(userData.email,  userData.password, userData.name));
  };

  React.useEffect(() => {
    if(registrationRequestSuccess){
      setTimeout(() => navigate(loginPATH), 4000);
    }
  }, [registrationRequestSuccess]);
  
  return (
    <div className={styles.wrapper}>
    <section className={`${styles.main_container}`}>
      <h2 className='text text_type_main-medium mb-6'>Register</h2>
      <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
        {inputsRegisterPage.map((input, index) => (
          <Input 
          {...input} 
          key={index} 
          // @ts-ignore
          value={userData[input.name]} 
          onChange={hadleChangeUserData}
          />

        ))}
        {registrationRequest && (
          <TailSpin color="black" radius={"2px"} />
        )}
        {error && error !== 'User already exists' && (
          <>
            <ImCancelCircle color='#E25563' size='42px' />
            <p className={styles.server_message}>Occured unknow error. Please try later</p>
          </>
        )}
        {error === 'User already exists' && (
          <>
            <ImCancelCircle color='#E25563' size='42px' />
            <p className={styles.server_message}>{error}</p>
          </>
        )}
        {registrationRequestSuccess && (
          <>
            <MdDone color='#20C997' size='42px'/>
            <p className={styles.server_message}>Registration success</p>
          </>
        )}
        
        <button className={styles.submit_button} type="submit">Register</button>
      </form>
      <ul className={`${styles.links_container}`}>
        <li className={`${styles.links_row}`}>
          <Link to={loginPATH} className={styles.link_description}> 
            LOG IN
          </Link>
        </li>
      </ul>
    </section>
  </div>
  )
}

export default RegisterPage