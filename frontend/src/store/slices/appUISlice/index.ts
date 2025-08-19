import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const savedExpandMenu = localStorage.getItem("expandMenu");

const initialState: UIState = {
  expandMenu: savedExpandMenu ? JSON.parse(savedExpandMenu) : false,
  isLoading: false,
  token: null,
};

const appUISlice = createSlice({
  name: "appUI",
  initialState,
  reducers: {
    toggleExpandMenu: (state) => {
      state.expandMenu = !state.expandMenu;
      localStorage.setItem("expandMenu", JSON.stringify(state.expandMenu));
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { toggleExpandMenu, setLoading, setToken } = appUISlice.actions;

export default appUISlice.reducer;
