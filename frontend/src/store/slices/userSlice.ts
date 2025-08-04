import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userProfile: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
    address: string;
    avatarUrl: string;
    bio: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

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
