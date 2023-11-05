export type TCartItem = {
  id: string;
  id_: string;
  count: number
  name: string;
  color: string;
  size: string;
  price: number;
  photo: Array<string>;
};

export type TGood = {
  id: string;
  name: string;
  sex: string;
  sizes: Array<number>;
  price: number;
  type: string;
  description: string;
  colors: Array<string>;
  photos: any;
};

export type TUser = {
  email: string;
  name: string;
};