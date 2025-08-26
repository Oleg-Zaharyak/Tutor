import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Account } from "./types";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.account,
  }),

  endpoints: (builder) => ({
    // Список акаунтів
    getUserAccountsList: builder.query<
      Account[],
      { profileId: string; token: string }
    >({
      query: ({ profileId, token }) => ({
        url: `allUserAccounts/${profileId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // Дані акаунта по id
    getCurrentUserAccount: builder.query<
      Account,
      { id: string; token: string }
    >({
      query: ({ id, token }) => ({
        url: `${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // створення акаунта
    createAccount: builder.mutation<
      Account,
      { profileId: string; type: string; token: string }
    >({
      query: ({ profileId, type, token }) => ({
        url: "create",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { profileId, type },
      }),
    }),

    // Обновлення акаунта
    // updateProfile: builder.mutation<
    //   UserProfile,
    //   { profileId: string; token: string; data: Partial<UserProfile> }
    // >({
    //   query: ({ profileId, token, data }) => ({
    //     url: "update",
    //     method: "PATCH",
    //     body: { profileId, data },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
  }),
});

export const {
  useGetUserAccountsListQuery,
  useGetCurrentUserAccountQuery,
  useCreateAccountMutation,
} = accountApi;
