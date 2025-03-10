import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  theme: string;
}

const initialState: CounterState = {
  theme: localStorage.getItem("theme") || "light",
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
