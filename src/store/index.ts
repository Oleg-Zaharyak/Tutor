import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import appUISlice from "./slices/appUISlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    appUI: appUISlice,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
