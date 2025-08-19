import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "../slices/appUISlice";
import { setUser } from "../slices/userSlice";

export const getProfileById = createAsyncThunk(
  "profile/fetchById",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `http://localhost:4000/api/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      thunkAPI.dispatch(setUser(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
