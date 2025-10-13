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

    getConnectedAccountProfileList: builder.query<ConnectedAccount[], void>({
      query: () => ({
        url: "getAllConnectedAccounts",
      }),
      providesTags: ["Connections"],
    }),

    // створення конекшена
    createAccountConnection: builder.mutation<
      StudentTeacher,
      {
        targetEmail: string;
      }
    >({
      query: ({ targetEmail }) => ({
        url: "createNewConnection",
        method: "POST",
        body: { targetEmail },
      }),
      invalidatesTags: ["Connections"],
    }),
  }),
});

export const {
  useGetConnectedAccountProfileListQuery,
  useCreateAccountConnectionMutation,
} = connectionApi;
