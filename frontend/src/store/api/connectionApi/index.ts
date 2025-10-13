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
        url: "getAllConnections",
      }),
      providesTags: ["Connections"],
    }),

    // Витягування конекшина по ід
    getConnectionById: builder.query<ConnectedAccount, string>({
      query: (connectionId) => ({
        url: `getConnections/${connectionId}`, // відповідає бекенд ендпоїнту /api/connections/:id
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
  useGetConnectionByIdQuery,
  useCreateAccountConnectionMutation,
} = connectionApi;
