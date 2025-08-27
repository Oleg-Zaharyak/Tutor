import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const savedExpandMenu = localStorage.getItem("expandMenu");

const initialState: UIState = {
  expandMenu: savedExpandMenu ? JSON.parse(savedExpandMenu) : false,
  isLoading: false,
  userId: "",
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { toggleExpandMenu, setLoading, setUserId } = appUISlice.actions;

export default appUISlice.reducer;
