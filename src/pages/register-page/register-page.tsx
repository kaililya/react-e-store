import React from 'react'
import styles from '../login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { fetchRegisterThunk } from '../../services/thunks/ActionCreators';
import { TailSpin } from "react-loader-spinner";
import { MdDone } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {registrationRequest, registrationRequestSuccess, error} = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    email: '',
    name:'',
    password: '',
  });

  const inputsRegisterPage = [
    {
      name:"email",
      type:"email",
      placeholder: "Email",
      errorMessage:"Email shoud be valid",
      label:"Email",
      image: '../../images/icons/email_icon_grey_background_icon.png',
      required: true,
    },
    {
      name:"name",
      type:"name",
      placeholder: "Name",
      errorMessage:"Name should not be empty",
      label:"name",
      image: '../../images/icons/login_icon.png',
      required: true,
    },

    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password shoud be more then 8 characters and shoudn't include any special character",
      label: "Password",
      image:'../../images/icons/key_icon.png',
      required: true,
      pattern: "^[A-Za-z0-9]{8,1000}"
    }
  ]

  

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();

    dispatch(fetchRegisterThunk(userData.email,  userData.password, userData.name));
  };

  React.useEffect(() => {
    if(registrationRequestSuccess){
      const timer = setTimeout(() => navigate('/login'),4000)
    }
  
  }, [registrationRequestSuccess])
  
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
        {error && error !== 'User already exists' &&(
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
          <Link to='/register' className={styles.link_description}> 
            LOG IN
          </Link>
        </li>
      </ul>
    </section>
  </div>
  )
}

export default RegisterPage