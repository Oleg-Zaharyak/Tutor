import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Account } from "./types";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.account,
    credentials: "include",
    prepareHeaders: async (headers) => {
      // Отримуємо токен з Clerk через глобальний об'єкт (або через window.Clerk)
      // Це безпечно, бо Clerk сам кешує токен у пам'яті
      const token = await window.Clerk?.session?.getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account"],

  endpoints: (builder) => ({
    // Список акаунтів
    getUserAccountsList: builder.query<Account[], void>({
      query: () => ({
        url: "/",
      }),
      providesTags: ["Account"],
    }),

    // Дані акаунта по id
    getCurrentUserAccount: builder.query<Account, void>({
      query: () => ({
        url: "/current",
      }),
      providesTags: ["Account"],
    }),

    // створення акаунта
    createAccount: builder.mutation<Account, { type: string }>({
      query: ({ type }) => ({
        url: "/",
        method: "POST",
        body: { type },
      }),
      invalidatesTags: ["Account"],
    }),

    // Обновлення акаунта
    // updateProfile: builder.mutation<
    //   UserProfile,
    //   { profileId: string; data: Partial<UserProfile> }
    // >({
    //   query: ({ profileId, data }) => ({
    //     url: "update",
    //     method: "PATCH",
    //     body: { profileId, data },
    //   }),
    // }),
  }),
});

export const {
  useGetUserAccountsListQuery,
  useGetCurrentUserAccountQuery,
  useCreateAccountMutation,
} = accountApi;
