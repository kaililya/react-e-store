import React from 'react'
import styles from '../login/login.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { useNavigate } from 'react-router';
import { TailSpin } from "react-loader-spinner";
import { fetchResetPasswordThunk } from '../../services/thunks/ActionCreators';
import { MdDone } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';

function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {resetPasswordRequest , resetPasswordRequestSuccess, resetPasswordRequestFailed, error} = useAppSelector(store => store.userReducer);
  const { hadleChangeUserData, userData } = useForm({
    password: '',
    code:'',
  });

  const inputsResetPasswordPage = [
    {
      name: "password",
      type: "password",
      placeholder: "Press new password",
      errorMessage: "Password shoud be more then 4 characters and shoudn't include any special character",
      label: "Password",
      required: true,
      pattern: "^[A-Za-z0-9]{4,1000}"
    },
    {
      name: "code",
      type: "text",
      placeholder: "Enter code from email",
      errorMessage: "",
      label: "Verify code",
      required: true,
    },

  ]

  const hadleSubmit = (e:React.FormEvent):void => {
    e.preventDefault();
    dispatch(fetchResetPasswordThunk(userData.password, userData.code))
  };

  React.useEffect(() => {
    if(resetPasswordRequestSuccess){
      const timer = setTimeout(() => navigate('/login', {replace: true}), 3000)
    }
  
  }, [resetPasswordRequestSuccess])

  return (
    <div className={styles.wrapper}>
    <section className={`${styles.main_container}`}>
      <h2 className='text text_type_main-medium mb-6'>RESET PASSWORD</h2>
      <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
        {inputsResetPasswordPage.map((input, index) => (
          <Input 
          {...input} 
          key={index} 
          // @ts-ignore
          value={userData[input.name]} 
          onChange={hadleChangeUserData}
          />

        ))}
        {resetPasswordRequest && (
          <TailSpin color="black" radius={"2px"} />
        )}
        {resetPasswordRequestFailed && error === 'Incorrect reset token' && (
          <>
           <ImCancelCircle color='#E25563' size='42px' />
           <p className={styles.server_message}>Ver. code is not correct. Please use verify code from email message </p>
          </>
        )}

        {resetPasswordRequestFailed && error !== 'Incorrect reset token' && (
          <>
           <ImCancelCircle color='#E25563' size='42px' />
           <p className={styles.server_message}>Occured unknow error. Please try later</p>
          </>
        )}
        {resetPasswordRequestSuccess && (
          <>
          <MdDone color='#20C997' size='42px'/>
          <p className={styles.server_message}>Success! Your password was updated</p>
          </>

        )}
        <button className={styles.submit_button} type="submit">Save</button>
      </form>
      {/* <ul className={`${styles.links_container}`}>
        <li className={`${styles.links_row}`}>
          <Link to='/register' className={styles.link_description}> 
            LOG IN
          </Link>
        </li>
      </ul> */}
    </section>
  </div>
  )
}

export default ResetPasswordPage