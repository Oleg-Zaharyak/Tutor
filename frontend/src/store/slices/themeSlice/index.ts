import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "./types";


const savedTheme = localStorage.getItem("theme");
const isValidTheme = savedTheme === "light" || savedTheme === "dark";

const initialState: ThemeState = {
  theme: isValidTheme ? savedTheme : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // Зберігаємо вибір
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
