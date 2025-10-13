import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Account } from "./types";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.account,
    credentials: "include",
  }),
  tagTypes: ["Account"],

  endpoints: (builder) => ({
    // Список акаунтів
    getUserAccountsList: builder.query<Account[], void>({
      query: () => ({
        url: "getAllUserAccounts",
      }),
      providesTags: ["Account"],
    }),

    // Дані акаунта по id
    getCurrentUserAccount: builder.query<Account, void>({
      query: () => ({
        url: "getCurrentUserAccount",
      }),
      providesTags: ["Account"],
    }),

    // створення акаунта
    createAccount: builder.mutation<Account, { type: string }>({
      query: ({ type }) => ({
        url: "createNewAccount",
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
