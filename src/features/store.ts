import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type stateDispatch = typeof store.dispatch;
export const useStateDispatch = () => useDispatch<stateDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
