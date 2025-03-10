import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
