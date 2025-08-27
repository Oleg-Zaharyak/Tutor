import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Account } from "./types";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.account,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // Список акаунтів
    getUserAccountsList: builder.query<Account[], { profileId: string }>({
      query: ({ profileId }) => ({
        url: `allUserAccounts/${profileId}`,
      }),
    }),

    // Дані акаунта по id
    getCurrentUserAccount: builder.query<Account, { id: string }>({
      query: ({ id }) => ({
        url: `${id}`,
      }),
    }),

    // створення акаунта
    createAccount: builder.mutation<
      Account,
      { profileId: string; type: string }
    >({
      query: ({ profileId, type }) => ({
        url: "create",
        method: "POST",
        body: { profileId, type },
      }),
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
