import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit"

// type TGoodCardItem = {
//   id: string;
//   count: number;
//   name: string;
//   color: string;
//   size: number;
//   price: number;
//   photo: string;
// }

const intitialState:any = {
  goodsArray: [],

}

export const cardSlice = createSlice({
  name: 'cart',
  initialState: intitialState,
  reducers: {
    addGoodToCart(state, action:PayloadAction<any>) {
      console.log(action.payload);

      const isDuplicateitem = state.goodsArray.find((item:any) => 
        item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      );
      if (isDuplicateitem) {
        isDuplicateitem.count = isDuplicateitem.count + action.payload.count;
      } else {
      state.goodsArray.push(action.payload);
      }
    },
    clearCart(state) {
      state.goodsArray = [];
    },
    removeGoodFromCart(state, action:PayloadAction<any>) {
      state.goodsArray = state.goodsArray.filter((item:any) => 
      item.id_ !== action.payload.id_ || item.color !== action.payload.color || item.size !== action.payload.size
      )
    },
    increaseCount(state, action:PayloadAction<any>) {
      const item = state.goodsArray.find((item:any) => 
        item.id_ === action.payload.id_ 
      )
      item.count = item.count + 1;
    },
    decreaseCount(state, action:PayloadAction<any>) {
      const item = state.goodsArray.find((item:any) => 
        item.id_ === action.payload.id_ 
      )
      item.count = item.count <= 1 ? item.count :item.count - 1
      
    },

  },
})

type TSliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type TCardActionTypes = TSliceActions<typeof cardSlice.actions>

export const { addGoodToCart, removeGoodFromCart, clearCart, increaseCount, decreaseCount } = cardSlice.actions;

export default cardSlice.reducer