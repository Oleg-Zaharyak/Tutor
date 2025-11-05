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
        url: "/",
      }),
      providesTags: ["Connections"],
    }),

    // Витягування конекшина по ід
    getConnectionById: builder.query<StudentTeacher, string>({
      query: (connectionId) => ({
        url: `/${connectionId}`, // відповідає бекенд ендпоїнту /api/connections/:id
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
        url: "/",
        method: "POST",
        body: { targetEmail },
      }),
      invalidatesTags: ["Connections"],
    }),

    // Видалення конекшина
    deleteConnection: builder.mutation<{ message: string }, string>({
      query: (connectionId) => ({
        url: `/${connectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Connections"],
    }),
  }),
});

export const {
  useGetConnectedAccountProfileListQuery,
  useGetConnectionByIdQuery,
  useCreateAccountConnectionMutation,
  useDeleteConnectionMutation,
} = connectionApi;
