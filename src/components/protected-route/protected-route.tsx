import React, { useEffect, FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setAuthChecked } from '../../services/slices/user-slice';
import { checkUserAuth } from '../../utils/api';
import { batch } from 'react-redux';

type TProtectedRoute = {
  readonly onlyUnAuth: boolean;
  readonly component: JSX.Element;
};

const ProtectedRoute = ({ onlyUnAuth = false, component}:TProtectedRoute) => {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector((store) => store.userReducer.isAuthChecked);
  const user = useAppSelector((store) => store.userReducer.userData);
  const location = useLocation();
  // const { from } = location.state || { from: { pathname: "/" } };

  React.useEffect(() => {
    
      dispatch(setAuthChecked(false));
      dispatch(checkUserAuth());
 
  },[dispatch])

  if(!isAuthChecked) {
    return null
  }

  if (onlyUnAuth && user) {
    console.log(`Авторизован`)
    const { from } = location.state || { from: { pathname: "/" } };
    
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log(`Не авторизован`)
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = (props: any) => <ProtectedRoute onlyUnAuth={false} {...props} />;
export const OnlyUnAuth = (props: any) => <ProtectedRoute onlyUnAuth={true} {...props} />;

