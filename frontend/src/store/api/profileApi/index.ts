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
    // Дані профіля
    getCurrentUserProfile: builder.query<Profile, void>({
      query: () => ({
        url: "getCurrentUserProfile",
      }),
      providesTags: ["Profile"],
    }),

    // створення профіля
    createProfile: builder.mutation<Profile, { id: string; email: string }>({
      query: ({ id, email }) => ({
        url: "createNewProfile",
        method: "POST",
        body: { id, email },
      }),
    }),

    // Обновлення профілю
    updateProfile: builder.mutation<Profile, { data: Partial<Profile> }>({
      query: ({ data }) => ({
        url: "updateUserProfile",
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["Profile"],
    }),

    // Створення Акаунта

    //Оновлення фото профілю
    uploadProfileAvatar: builder.mutation<
      { message: string; path: string },
      FormData
    >({
      query: (formData) => ({
        url: `${urls.uploads}/uploadAvatar`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetCurrentUserProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadProfileAvatarMutation,
} = profileApi;
