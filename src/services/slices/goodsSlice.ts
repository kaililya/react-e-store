import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit"
import { TGood } from '../../types/types';


type TIntitialStateGoods<T> = {
  goods: Array<T> | [];
  isLoading: boolean;
  error: string | null;
  currentGood: T | any;
}

const intitialState: TIntitialStateGoods<TGood> = {
  goods: [],
  isLoading: false,
  error: null,
  currentGood: null,
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: intitialState,
  reducers: {
    getGoodsRequestSent(state) {
      state.isLoading = true;
    },
    getGoodsRequestSuccessed(state, action: PayloadAction<TGood[]>) {
      state.isLoading = false;
      state.error = null;
      state.goods = action.payload;
    },
    getGoodsRequestFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUniqueGoodRequestSent(state) {
      state.isLoading = true;
    },
    getUniqueGoodRequestSuccess(state, action: PayloadAction<TGood>) {
      state.isLoading = false;
      state.currentGood = action.payload;
    },
    getUniqueGoodRequestFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setClearUniqueGood(state) {
      state.currentGood = null;
    },
  },
})

export const { setClearUniqueGood
 } = goodsSlice.actions;

type TSliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type TGoodsActionTypes = TSliceActions<typeof goodsSlice.actions>

export default goodsSlice.reducer