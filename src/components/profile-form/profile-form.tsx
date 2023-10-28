import { FormEvent, useEffect, useState } from 'react'
import styles from './profile-form.module.css'
import useForm from '../../hooks/useForm'
// import { updateUserDataThunk2, } from '../../utils/api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Input from '../../ui/input/input';
import { updateUserDataThunk } from '../../services/thunks/ActionCreators';

type TFormStateType = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

const ProfileForm = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const [inputChanged, setInputChanged] = useState<boolean>(false);
  const userDataStore = useAppSelector(store => store.userReducer.userData);
  const oldEmail = userDataStore?.email;
  const oldName = userDataStore?.name;

  const {hadleChangeUserData, userData, setUserData} = useForm<TFormStateType>({
    name: '',
    email: '',
    password: '',
  });

  const inputsProfilePage = [
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
      name:"email",
      type:"email",
      placeholder: "Email",
      errorMessage:"Email shoud be valid",
      label:"Email",
      image: '../../images/icons/email_icon_grey_background_icon.png',
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
      pattern: "^[A-Za-z0-9]{6,1000}"
    }
  ]
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputChanged(true);
    hadleChangeUserData(e);
  };

  useEffect(() => {
    setUserData({
      name: oldName,
      email: oldEmail,
      password: ''
    })
  }, [oldName, oldEmail, setUserData]);

  const hadleSubmit = (e:FormEvent) => {
    e.preventDefault();
    console.log(userData.name, userData.email, userData.password)
    // @ts-ignore
    dispatch(updateUserDataThunk(userData.name, userData.email, userData.password));
  }

  const handleCancelChanges = (e:React.SyntheticEvent) => {
    e.preventDefault();
    setUserData({
      ...userData,
      name: oldName,
      email: oldEmail,
      password: ''
    });
    setInputChanged(false);
  };

  return (
    <form onSubmit={hadleSubmit} className={`${styles.form_container}`}>
      {inputsProfilePage.map((input, index) => (
        <Input 
        {...input} 
        key={index} 
        // @ts-ignore
        value={userData[input.name]} 
        onChange={onChange}
      />
      ))}
      {inputChanged && (
        <div className={`${styles.button_container}`}>
          <button className={styles.form_button}  type="button" onClick={handleCancelChanges}>
            Cancel changes
          </button>
          <button className={styles.form_button}  type="submit">
           Save changes
          </button>
        </div>
      )} 
    </form>
  )
}

export default ProfileForm