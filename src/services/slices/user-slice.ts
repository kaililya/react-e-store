import { createSlice } from '@reduxjs/toolkit';

const intitialState:any = {
  userData: null,
  loginingRequest: false,
  loginingRequestSuccess: false,
  loginingRequestFailed: false,
  logoutingRequest: false,
  logoutingRequestSuccess: false,
  logoutingRequestFailed: false,
  registrationRequest: false,
  registrationRequestSuccess: false,
  registrationRequestFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordRequestSuccess: false,
  forgotPasswordRequestFailed: false,
  resetPasswordRequest: false,
  resetPasswordRequestSuccess: false,
  resetPasswordRequestFailed: false,
  refreshTokenRequest: false,
  refreshTokenRequestSuccess: false,
  refreshTokenRequestFailed: false,
  updateUserDataRequest: false,
  updateUserDataRequestSuccess: false,
  updateUserDataRequestFailed: false,
  getUserDataRequest: false,
  getUserDataRequestSuccess: false,
  getUserDataRequestFailed: false,
  error: null,
  passwordForgotten: false,
  isUserAuth: false,
  isAuthChecked: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState: intitialState,
  reducers: {
    registrationRequest(state) {
      state.registrationRequest = true 
    },
    registrationRequestSuccessed(state) {
      state.registrationRequest = false; 
      state.registrationRequestSuccess = true; 
    },
    registrationRequestFailed(state, action) {
      state.registrationRequest = false;
      state.registrationRequestFailed = true; 
      state.error = action.payload;
    },
    logingRequest(state) {
      state.loginingRequest = true; 
    },
    loginingRequestSuccess(state, action) {
      state.loginingRequest = false;
      state.loginingRequestSuccess = true;
      state.userData = action.payload; 
      state.isUserAuth = true;
    },
    loginingRequestFailed(state, action) {
      state.loginingRequest = false;
      state.loginingRequestFailed = true;
      state.error = action.payload
    },
    forgotPasswordRequest(state) {
      state.forgotPasswordRequest = true;
      state.forgotPasswordRequestSuccess = false;
      state.forgotPasswordRequestFailed = false;
      state.erorr = null;
      
    },
    forgotPasswordRequestSuccess(state) {
      state.forgotPasswordRequest = true;
      state.forgotPasswordRequestSuccess = true;
      state.forgotPasswordRequestFailed = false;
      state.erorr = null;
    },
    forgotPasswordRequestFailed(state, action) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordRequestFailed = true;
      state.forgotPasswordRequestSuccess = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.resetPasswordRequest = true;    
      state.resetPasswordRequestSuccess = false;
      state.resetPasswordRequestFailed = false;
      state.error = null;
    },
    resetPasswordRequestSuccess(state) {
      state.resetPasswordRequest = false;
      state.resetPasswordRequestSuccess = true;
      state.resetPasswordRequestFailed = false;
      state.error = null;
    },
    resetPasswordRequestFailed(state, action) {
      state.resetPasswordRequestSuccess = false;
      state.resetPasswordRequest = false;
      state.resetPasswordRequestFailed = true;
      state.error = action.payload;
    },
    logoutingRequest(state) {
      state.logoutingRequest = true;
    },
    logoutingRequestSuccess(state) {
      state.logoutingRequest = false;
      state.logoutingRequestSuccess = true;
      state.userData = null;
      state.isUserAuth = false;

      state.loginingRequestSuccess = false;
      state.loginingRequestFailed = false;
      state.error = null
    },
    logoutingRequestFailed(state, action) {
      state.logoutingRequest = false;
      state.logoutingRequestFailed = true;
      state.error = action.payload;
    },
    getUserDataRequest(state) {
      state.getUserDataRequest = true;
    },
    getUserDataRequestSuccess(state, action) {
      state.getUserDataRequest = false;
      state.getUserDataRequestSuccess = true;
      state.userData = action.payload;
    },
    getUserDataRequestFailed(state, action) {
      state.getUserDataRequest = false;
      state.getUserDataRequestFailed = true;
      state.error = action.payload;
    },
    updateUserDataRequest(state) {
      state.updateUserDataRequest = true;
    },
    updateUserDataRequestFailed(state, action) {
      state.updateUserDataRequest = false;
      state.updateUserDataRequestFailed = true;
      state.error = action.payload
    },
    updateUserDataRequestSuccess(state, action) {
      state.updateUserDataRequest = false;
      state.updateUserDataRequestSuccess = true;
      state.userData = action.payload;
    },
    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload
    }
  },
})

type TSliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type TUserActionTypes = TSliceActions<typeof userSlice.actions>

export const { registrationRequest, 
  registrationRequestSuccessed,
  registrationRequestFailed,
  logingRequest,
  loginingRequestSuccess,
  loginingRequestFailed,
  forgotPasswordRequest,
  forgotPasswordRequestSuccess,
  forgotPasswordRequestFailed,
  resetPasswordRequest,
  resetPasswordRequestSuccess,
  resetPasswordRequestFailed,
  logoutingRequest,
  logoutingRequestSuccess,
  logoutingRequestFailed,
  getUserDataRequest,
  getUserDataRequestSuccess,
  getUserDataRequestFailed,
  updateUserDataRequest,
  updateUserDataRequestSuccess,
  updateUserDataRequestFailed,
  setAuthChecked,
  setUserData,
 } = userSlice.actions;

export default userSlice.reducer