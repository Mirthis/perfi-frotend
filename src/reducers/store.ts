import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authReducer';
import plaidReducer from './plaidReducer';
import { perfiApi } from '../services/api';
import txFilterReducer from './txFilterReducer';

const store = configureStore({
  reducer: {
    loggedUser: authReducer,
    plaid: plaidReducer,
    txFilter: txFilterReducer,
    [perfiApi.reducerPath]: perfiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(perfiApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
