import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { UserProfile } from "./types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.profile,
  }),

  endpoints: (builder) => ({
    // Дані профіля по id
    getCurrentUserProfile: builder.query<
      UserProfile,
      { id: string; token: string }
    >({
      query: ({ id, token }) => ({
        url: `${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // створення профіля
    createProfile: builder.mutation<
      UserProfile,
      { id: string; email: string; token: string }
    >({
      query: ({ id, email, token }) => ({
        url: "create",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id, email },
      }),
    }),
    
    // Обновлення профілю
    updateProfile: builder.mutation<
      UserProfile,
      { profileId: string; token: string; data: Partial<UserProfile> }
    >({
      query: ({ profileId, token, data }) => ({
        url: "update",
        method: "PATCH",
        body: { profileId, data },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // Створення Акаунта

    //Обновлення Акаунта
  }),
});

export const {
  useGetCurrentUserProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = profileApi;


