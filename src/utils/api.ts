import { TAppThunk } from "../services/store";
import { getUserDataRequestSuccess, setAuthChecked, setUserData } from "../services/slices/user-slice";
import { endPointForgotPassword, endPointLogin, endPointLogouting, endPointRefreshToken, endPointRegistration, endPointResetPassword, endPointUpdateUserData, mainUrl } from "./constants";

const defaultHeaders = {
  "Content-Type": "application/json"
};

const authorizationHeader = (token:string|null) => {
  return {
  'Content-Type': 'application/json',
  authorization: token
  };
};
export const checkResponse = (res:Response):Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
  .then((err) => {
    console.log(err)

    err.httpCode = res.status;
    return Promise.reject(err);
  })
}

const refreshToken = () => {
  return fetch(`${mainUrl}${endPointRefreshToken}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  }).then(checkResponse);
};



const makeFetchOptions = (method:"POST"|"GET"|"PATCH", headers: any, body:any):any => {
  const options: {method: string; headers: null|HeadersInit; body?:any } = {
    method: !!method ? method : 'GET',
    headers
  };
  if (body) {
    options.body = JSON.stringify(body)
  }
  return options;
}

const fetchWithRefresh = async (url:string, options:any):Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err)  {
    const error = err as Error;
    if (error.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err)
    }
  }
};
export const getUser = ():TAppThunk => {
  return (dispatch) => {
    return fetchWithRefresh(mainUrl + endPointUpdateUserData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("accessToken")
      }
    }).then((res) => {
      if (res.success) {
        dispatch(getUserDataRequestSuccess(res.user));
      } else {
        return Promise.reject("Ошибка данных с сервера");
      }
    })
    .catch(err => console.log(err))
    ;
  };
};
export const checkUserAuth = () => {
  // @ts-ignores
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
      // @ts-ignore
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUserData(null));
      })
      .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUserData(null));
    }
  };
};

export const registerUser = (email:string, password:string, name:string) => {
  const body = {
    email: email, 
    password: password,
    name: name
  };

  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch(mainUrl + endPointRegistration, options)
  .then(checkResponse); 
};


export const loginUser = (email:string, password:string) => {
  const body = {
    email: email, 
    password: password 
  };
  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch(mainUrl + endPointLogin, options)
  .then(checkResponse);
};

export const forgotPasswordPost = (email:string) => {
  const body = {
    email: email
  };
  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch(mainUrl + endPointForgotPassword, options)
  .then(checkResponse);
};

export const resetPasswordPost = (password:string, code:string) => {
  const body = {
    password: password,
    token: code
  };
  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch(mainUrl + endPointResetPassword, options)
  .then(checkResponse);
};

export const logoutUser = (refreshToken:string|null) => {
  const body = {
    "token": refreshToken
  };
  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch(mainUrl + endPointLogouting, options)
  .then(checkResponse);
};

export const updateUserData = (name: string | null | undefined, email: string | null | undefined, password: string | null | undefined) => {
  const body = { 
    "name": name,
    "email": email,
    "password": password
  }
  const options = makeFetchOptions("PATCH", authorizationHeader(localStorage.getItem("accessToken")), body);
  return fetchWithRefresh(mainUrl + endPointUpdateUserData, options)
  .then(checkResponse);
};

