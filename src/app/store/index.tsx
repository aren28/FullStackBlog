import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { blogApi } from './services/blog';
import userReducer from './slices/userSlices';

export const makeStore = () =>
  configureStore({
    reducer: {
      [blogApi.reducerPath]: blogApi.reducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
