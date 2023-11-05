import styles from './profile-page.module.css'
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import ProfileForm from '../../components/profile-form/profile-form';
import { fetchLogoutThunk } from '../../services/thunks/thunks';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { TailSpin } from 'react-loader-spinner';

const ProfilePage = ():JSX.Element => {

  const dispatch = useAppDispatch();
  const handleLogoutUser = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(fetchLogoutThunk(refreshToken));
  };

  const switchClassName = ({isActive}:{isActive:boolean}): string => (isActive ? `${styles.link_active} text text_type_main-medium` : `${styles.link} text text_type_main-medium`);

  return (
    <section className={`${styles.profile_container}`}>
      <nav className={`${styles.navigation_section}`}>
        <ul className={`${styles.link_container}`}>
          <li className={``}>
            <NavLink
              to="/profile"
              className={switchClassName}
            >
              Profile              
            </NavLink>
          </li>
          <li>
            <NavLink
              className={switchClassName}
              to="/login"
              onClick={handleLogoutUser}
            >
              Logout
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.navigation_description}`}>
          In this section you can change your personal data.
        </p>
      </nav>
      <ProfileForm/>
    </section>
  )
}

export default ProfilePage