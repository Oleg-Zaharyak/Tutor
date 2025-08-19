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
  }),
});

export const { useGetCurrentUserProfileQuery } = profileApi;
