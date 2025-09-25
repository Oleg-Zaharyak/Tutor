import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Profile } from "./types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.profile,
    credentials: "include",
  }),
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    // Дані профіля по id
    getCurrentUserProfile: builder.query<Profile, { id: string }>({
      query: ({ id }) => ({
        url: `${id}`,
      }),
      providesTags: ["Profile"],
    }),

    // створення профіля
    createProfile: builder.mutation<Profile, { id: string; email: string }>(
      {
        query: ({ id, email }) => ({
          url: "create",
          method: "POST",
          body: { id, email },
        }),
      }
    ),

    // Обновлення профілю
    updateProfile: builder.mutation<
    Profile,
      { profileId: string; data: Partial<Profile> }
    >({
      query: ({ profileId, data }) => ({
        url: "update",
        method: "PATCH",
        body: { profileId, data },
      }),
      invalidatesTags: ["Profile"],
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
