import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";



const initialState: UserState = {
  userProfile: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    birthDate: "",
    address: "",
    avatarUrl: "",
    bio: "",
    phoneNumber: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.userProfile = actions.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
