import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit"

// TODO
// 1) Разобраться почему проблемы с типизацией (что-то не так с использованием enum и литера пола)

// enum EShoesSize {
//   A = '36',
//   B = '37',
//   C = '38',
//   D = '39',
//   E = '40',
//   F = '41',
//   G = '42',
//   H = '43',
//   I = '44',
// }

// enum ETypeShoes {
//   Lifestyle = 'lifestyle',
//   Running = 'running',
//   Football = 'football',
//   Basketball = 'basketball'
// }

export type TGoods = {
  id: string;
  name: string;
  sex: string;
  sizes: any;
  price: number;
  type: any;
  description: string;
  colors: any;
  photos: any;
}


type TIntitialStateGoods<T> = {
  goods: Array<T> | [];
  isLoading: boolean;
  error: string | null;
  currentGood: any;
}

const intitialState: TIntitialStateGoods<TGoods> = {
  goods: [],
  isLoading: false,
  error: null,
  currentGood: null
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: intitialState,
  reducers: {
    getGoodsRequestSent(state) {
      state.isLoading = true;
    },
    getGoodsRequestSuccessed(state, action: PayloadAction<TGoods[]>) {
      state.isLoading = false;
      state.error = null;
      state.goods = action.payload;
    },
    getGoodsRequestFailed(state, action:PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUniqueGoodRequestSent(state) {
      state.isLoading = true;
    },
    getUniqueGoodRequestSuccess(state, action) {
      state.isLoading = false;
      state.currentGood = action.payload
    },
    getUniqueGoodRequestFailed(state, action:PayloadAction<string>) {
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