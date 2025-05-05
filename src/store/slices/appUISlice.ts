import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  expandMenu: boolean;
}

const initialState: CounterState = {
  expandMenu: false,
};

const appUISlice = createSlice({
  name: "appUI",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.expandMenu = !state.expandMenu;
    },
  },
});

export const { toggleMenu } = appUISlice.actions;

export default appUISlice.reducer;
