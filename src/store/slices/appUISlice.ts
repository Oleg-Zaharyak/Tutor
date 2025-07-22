import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  expandMenu: boolean;
}

const savedExpandMenu = localStorage.getItem("expandMenu");

const initialState: UIState = {
  expandMenu: savedExpandMenu ? JSON.parse(savedExpandMenu) : false,
};

const appUISlice = createSlice({
  name: "appUI",
  initialState,
  reducers: {
    toggleExpandMenu: (state) => {
      state.expandMenu = !state.expandMenu;
      localStorage.setItem("expandMenu", JSON.stringify(state.expandMenu));
    },
  },
});

export const { toggleExpandMenu } = appUISlice.actions;

export default appUISlice.reducer;
