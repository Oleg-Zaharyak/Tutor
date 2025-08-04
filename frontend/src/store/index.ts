import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import appUISlice from "./slices/appUISlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    appUI: appUISlice,
    user: userSlice,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
