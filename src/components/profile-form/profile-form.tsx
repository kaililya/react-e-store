import { FormEvent, useEffect, useState } from 'react'
import styles from './profile-form.module.css'
import useForm from '../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Input from '../../ui/input/input';
import { updateUserDataThunk } from '../../services/thunks/thunks';
import { TailSpin } from 'react-loader-spinner';
import { MdDone } from 'react-icons/md';
import { inputsProfilePage } from '../../utils/constants';

type TFormStateType = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

const ProfileForm = ():JSX.Element => {

  const dispatch = useAppDispatch();
  const [ inputChanged, setInputChanged ] = useState<boolean>(false);
  const userDataStore = useAppSelector(store => store.userReducer.userData);
  const { updateUserDataRequest, updateUserDataRequestFailed } = useAppSelector(store => store.userReducer);

  const oldEmail = userDataStore?.email;
  const oldName = userDataStore?.name;

  const {hadleChangeUserData, userData, setUserData} = useForm<TFormStateType>({
    name: '',
    email: '',
    password: '',
  });

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
    dispatch(updateUserDataThunk(userData.name, userData.email, userData.password));
  };

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
          value={userData[input.name as keyof TFormStateType] } 
          onChange={onChange}
      />
      ))}
         {updateUserDataRequest && (
            <TailSpin color="black" radius={"2px"} />
          )}
         {updateUserDataRequestFailed && (
            <>
            <MdDone color='#20C997' size='42px'/>
            <p className={styles.server_message}>Data is changed</p>
            </>
          )}
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