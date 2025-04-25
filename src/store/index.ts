import {
  Action,
  Middleware,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";

import userSlice from "./slices/user.slice";

const loggerMiddleware: Middleware = () => (next) => (action) => {
  return next(action);
};

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([loggerMiddleware]),

  devTools:
    process.env.NODE_ENV !== "production"
      ? {
          trace: true,
          traceLimit: 25,
        }
      : { trace: true, traceLimit: 25 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
