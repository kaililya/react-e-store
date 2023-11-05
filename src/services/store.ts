import { configureStore,combineReducers } from '@reduxjs/toolkit';
import goodsReducer, { TGoodsActionTypes } from './slices/goodsSlice'
import cardReducer, { TCardActionTypes } from './slices/card-slice'
import userReducer, { TUserActionTypes } from './slices/user-slice'
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
  goodsReducer,
  cardReducer,
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];

export type TActions = TUserActionTypes  | 
                       TGoodsActionTypes |
                       TCardActionTypes;

export type TAppThunk<TReturn = void> = ThunkAction<TReturn, TRootState, never, TActions>;

