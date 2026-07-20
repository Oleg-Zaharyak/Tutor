import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { ConnectedAccount, StudentTeacher } from "./types";

const baseQuery = fetchBaseQuery({
  baseUrl: urls.connection,
  credentials: "include",
  // 2. prepareHeaders тепер — це просто "взяв і додав, якщо є"
  prepareHeaders: async (headers) => {
    try {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (err) {
      console.log(err);
    }
    return headers;
  },
});

// 3. ОБГОРТКА: Логіка автоматичного повтору запиту
const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Виконуємо перший запит
  let result = await baseQuery(args, api, extraOptions);

  // Логіка повтору
  if (result.error?.status === 401) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const connectionApi = createApi({
  reducerPath: "connectionApi",
  baseQuery: baseQueryWithRetry,
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
