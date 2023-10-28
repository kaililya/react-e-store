import { TAppDispatch } from '../store';
import { TGoods, goodsSlice } from '../slices/goodsSlice';
import userSlice, { forgotPasswordRequest, forgotPasswordRequestFailed, forgotPasswordRequestSuccess, logingRequest, loginingRequestFailed, loginingRequestSuccess, logoutingRequest, logoutingRequestFailed, logoutingRequestSuccess, registrationRequest, registrationRequestFailed, registrationRequestSuccessed, resetPasswordRequest, resetPasswordRequestFailed, resetPasswordRequestSuccess, updateUserDataRequest, updateUserDataRequestFailed, updateUserDataRequestSuccess } from '../slices/user-slice';
import { checkResponse, forgotPasswordPost, loginUser, logoutUser, registerUser, resetPasswordPost, updateUserData } from '../../utils/api';


import axios from 'axios';
import { QueryClient } from 'react-query';
import { useQuery, UseQueryResult } from 'react-query';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const mainUrl = 'https://650ea71954d18aabfe995724.mockapi.io/kail-store-nike/';
const endPointGoods = 'goods';
const endPointCurrentGood = 'goods/?name=';

export const fetchGoods = () => async(dispatch: TAppDispatch) => {
  try {
    dispatch(goodsSlice.actions.getGoodsRequestSent());

    const response = await axios.get<TGoods[]>(mainUrl + endPointGoods + decodeURI(window.location.search)); 
    // console.log(response);
    dispatch(goodsSlice.actions.getGoodsRequestSuccessed(response.data))
    //@ts-ignore
  } catch (error: AxiosError ) {
    if (error.request) {
      // Применяйте следующее: “Показать страницу 404 Not Found / сообщение об ошибке, если ваш API возвращает 404.” 
      // показывать предупреждение с надписью “422 необработанных объекта” бесполезно для пользователя.
      if (error.response) { 
        dispatch(goodsSlice.actions.getGoodsRequestFailed(error.message))
      } else if (error.request) { 
        dispatch(goodsSlice.actions.getGoodsRequestFailed(error.message))
      } else { 
      } 
    }
  }
}

export const fetchCurrentGood = (name:any) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(goodsSlice.actions.getUniqueGoodRequestSent());
    console.log(mainUrl + endPointCurrentGood + name);
    const response = await axios.get<any>(mainUrl + endPointCurrentGood + name ); 
    // console.log(response);
    dispatch(goodsSlice.actions.getUniqueGoodRequestSuccess(response.data))
    //@ts-ignore
  } catch (error: AxiosError ) {
    if (error.request) {
      if (error.response) { 
        dispatch(goodsSlice.actions.getUniqueGoodRequestFailed(error.message))
      } else if (error.request) { 
        dispatch(goodsSlice.actions.getUniqueGoodRequestFailed(error.message))
      } else { 
      } 
    }
  }
}

export const fetchLoginThunk = (email:any, password:any) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(logingRequest());
    const response = await loginUser(email, password);
    console.log(response)
    if (response.success) {
      localStorage.setItem('accessToken',response.accessToken)
      localStorage.setItem('refreshToken',response.refreshToken)

      dispatch(loginingRequestSuccess(response.user))
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(loginingRequestFailed(msg));
    }
    
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(loginingRequestFailed(msg));
  }
}

export const fetchRegisterThunk = (email:any, password:any, name:any) => async(dispatch: TAppDispatch) => {
  try {
    dispatch(registrationRequest());

    const response = await registerUser(email, password, name);
    if (response.success) {
      dispatch(registrationRequestSuccessed())
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(registrationRequestFailed(msg));
    }
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(registrationRequestFailed(msg));
  }
}

export const fetchForgotPasswordThunk = (email:any) => async(dispatch: TAppDispatch) => {
  try {
    console.log("fetchForgotPasswordThunk");
    dispatch(forgotPasswordRequest());
    const response = await forgotPasswordPost(email);
    console.log(response)
    if (response.success) {
      console.log(response)
      dispatch(forgotPasswordRequestSuccess())
    } else {
      console.log(response)

      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(forgotPasswordRequestFailed(msg));
    }
    
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(forgotPasswordRequestFailed(msg));
  }
}

export const fetchResetPasswordThunk = (password:any, code:any) => async(dispatch: TAppDispatch) => {
  try {
    console.log("fetchResetPasswordThunk");
    dispatch(resetPasswordRequest());
    
    const response = await resetPasswordPost(password,code);
    console.log(response)
    if (response.success) {
      console.log(response)
      dispatch(resetPasswordRequestSuccess())
    } else {
      console.log(response)
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(resetPasswordRequestFailed(msg));
    }
    
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(resetPasswordRequestFailed(msg));
  }
}

export const fetchLogoutThunk = (token:any) => async(dispatch: TAppDispatch) => {
  try {
    console.log("fetchLogoutThunk");
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
    
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(logoutingRequestFailed(msg));
  }
}


export const updateUserDataThunk = (name:string, email:string, password:string) => async(dispatch: TAppDispatch) => {
  try {
    console.log("updateUserDataThunk");
    dispatch(updateUserDataRequest());
    
    const response = await updateUserData(name, email, password);
    if (response.success) {

      dispatch(updateUserDataRequestSuccess(response.user))
    } else {
      const msg = response.httpCode ? response.message : 'Не удалось связаться с сервером';
      dispatch(updateUserDataRequestFailed(msg));
    }
    
    //@ts-ignore
  } catch ({ httpCode, message } ) {
    const msg = httpCode ? message : 'Не удалось связаться с сервером';
    dispatch(updateUserDataRequestFailed(msg));
  }
}






const apiClient = axios.create({
  baseURL: 'https://650ea71954d18aabfe995724.mockapi.io/kail-store-nike/',
});

const queryClient = new QueryClient();

export { apiClient, queryClient }

const url = new URL('https://650ea71954d18aabfe995724.mockapi.io/kail-store-nike/goods');
// url.searchParams.append('sortBy', 'price');
// url.searchParams.append('name', 'Nike Jr. Mercurial Vapor 15 Club');



const fetchUsers = async (url:any) => {
  const res = await fetch(url);
  return res.json();
};


export function useItems():any {
  const location = useLocation();
  // console.log(decodeURIComponent(location.search))

  return useQuery(
    ['goods'],
    () => fetchUsers(url+location.search)
          // .then(res => console.log(res))
      
  );
}
   