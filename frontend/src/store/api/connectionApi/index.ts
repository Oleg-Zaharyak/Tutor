import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { ConnectedAccount, StudentTeacher } from "./types";

export const connectionApi = createApi({
  reducerPath: "connectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urls.connection,
    credentials: "include",
  }),
  tagTypes: ["Connections"],

  endpoints: (builder) => ({
    // Список всіх конекшенів

    getConnectedAccountProfileList: builder.query<
      ConnectedAccount[],
      { accountId: string }
    >({
      query: ({ accountId }) => ({
        url: `getAllConnectedAccounts/${accountId}`,
      }),
      providesTags: ["Connections"],
    }),

    // створення конекшена
    createAccountConnection: builder.mutation<
      StudentTeacher,
      {
        currentAccountId: string;
        targetEmail: string;
      }
    >({
      query: ({ currentAccountId, targetEmail }) => ({
        url: "create",
        method: "POST",
        body: { currentAccountId, targetEmail },
      }),
      invalidatesTags: ["Connections"],
    }),
  }),
});

export const {
  useGetConnectedAccountProfileListQuery,
  useCreateAccountConnectionMutation,
} = connectionApi;
