import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import appUISlice from "./slices/appUISlice";
import { profileApi } from "./api/profileApi";
import { accountApi } from "./api/accountApi";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    appUI: appUISlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(profileApi.middleware)
      .concat(accountApi.middleware),
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
