import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch } from "../services/store";
import { TRootState } from "../services/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;