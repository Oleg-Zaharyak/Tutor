import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Account } from "./types";

const baseQuery = fetchBaseQuery({
  baseUrl: urls.account,
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

export const accountApi = createApi({
  baseQuery: baseQueryWithRetry,
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
