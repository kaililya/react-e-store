import { TAppDispatch } from '../store';
import { goodsSlice } from '../slices/goodsSlice';
import { forgotPasswordRequest, forgotPasswordRequestFailed, forgotPasswordRequestSuccess, logingRequest, loginingRequestFailed, loginingRequestSuccess, logoutingRequest, logoutingRequestFailed, logoutingRequestSuccess, registrationRequest, registrationRequestFailed, registrationRequestSuccessed, resetPasswordRequest, resetPasswordRequestFailed, resetPasswordRequestSuccess, updateUserDataRequest, updateUserDataRequestFailed, updateUserDataRequestSuccess } from '../slices/user-slice';
import { forgotPasswordPost, loginUser, logoutUser, registerUser, resetPasswordPost, updateUserData } from '../../utils/api';
import axios from 'axios';
import { TGood } from '../../types/types';
import { endPointCurrentGood, endPointGoods, mainUrlGoods } from '../../utils/constants';

export const fetchLoginThunk = (email:string, password:string) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(logingRequest());
    const response = await loginUser(email, password);
    if (response.success) {
      localStorage.setItem('accessToken',response.accessToken)
      localStorage.setItem('refreshToken',response.refreshToken)
      dispatch(loginingRequestSuccess(response.user))
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(loginingRequestFailed(msg));
    }
  } catch ({ httpCode, message }) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(loginingRequestFailed(msg));
  }
}

export const fetchRegisterThunk = (email:string, password:string, name:string) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await registerUser(email, password, name);
    if (response.success) {
      dispatch(registrationRequestSuccessed())
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(registrationRequestFailed(msg));
    }
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(registrationRequestFailed(msg));
  }
}

export const fetchForgotPasswordThunk = (email: string) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const response = await forgotPasswordPost(email);
    if (response.success) {
      dispatch(forgotPasswordRequestSuccess())
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(forgotPasswordRequestFailed(msg));
    }
    
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(forgotPasswordRequestFailed(msg));
  }
}

export const fetchResetPasswordThunk = (password:string, code:string) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const response = await resetPasswordPost(password,code);
    if (response.success) {
      dispatch(resetPasswordRequestSuccess())
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(resetPasswordRequestFailed(msg));
    }
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(resetPasswordRequestFailed(msg));
  }
}

export const fetchLogoutThunk = (token:string| null) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(logoutingRequest());
    const response = await logoutUser(token);
    if (response.success) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch(logoutingRequestSuccess())
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(logoutingRequestFailed(msg));
    } 
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(logoutingRequestFailed(msg));
  }
}


export const updateUserDataThunk = (name: string | undefined, email: string | undefined, password: string | undefined) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(updateUserDataRequest());    
    const response = await updateUserData(name, email, password);
    if (response.success) {
      dispatch(updateUserDataRequestSuccess(response.user))
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(updateUserDataRequestFailed(msg));
    }
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(updateUserDataRequestFailed(msg));
  }
}

export const fetchGoods = () => async(dispatch: TAppDispatch) => {
  try {
    dispatch(goodsSlice.actions.getGoodsRequestSent());
    const response = await axios.get<TGood[]>(mainUrlGoods + endPointGoods + decodeURIComponent(window.location.search)); 
    dispatch(goodsSlice.actions.getGoodsRequestSuccessed(response.data))
  } catch (error) {
    if (error.response) { 
      dispatch(goodsSlice.actions.getGoodsRequestFailed(error.message))
    } else if (error.request) { 
      dispatch(goodsSlice.actions.getGoodsRequestFailed(error.message))
    } else { 
    } 
  }
}

export const fetchCurrentGood = (name: string|undefined) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(goodsSlice.actions.getUniqueGoodRequestSent());
    const response = await axios.get<TGood>(mainUrlGoods + endPointCurrentGood + name); 
    dispatch(goodsSlice.actions.getUniqueGoodRequestSuccess(response.data))
  } catch (error ) {
      if (error.response) { 
        dispatch(goodsSlice.actions.getUniqueGoodRequestFailed(error.message))
      } else if (error.request) { 
        dispatch(goodsSlice.actions.getUniqueGoodRequestFailed(error.message))
      } else { 
      } 
  }
}