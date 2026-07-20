import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { urls } from "../../../constants/endpointsApi";
import { Profile } from "./types";

const baseQuery = fetchBaseQuery({
  baseUrl: urls.profile,
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

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    // Дані профіля
    getCurrentUserProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/current",
      }),
      providesTags: ["Profile"],
    }),

    // створення профіля
    createProfile: builder.mutation<Profile, { id: string; email: string }>({
      query: ({ id, email }) => ({
        url: "/",
        method: "POST",
        body: { id, email },
      }),
    }),

    // Обновлення профілю
    updateProfile: builder.mutation<Profile, { data: Partial<Profile> }>({
      query: ({ data }) => ({
        url: "/",
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["Profile"],
    }),

    // Створення Акаунта

    //Оновлення фото профілю
    uploadProfileAvatar: builder.mutation<
      { message: string; path: string },
      FormData
    >({
      query: (formData) => ({
        url: `${urls.uploads}/uploadAvatar`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetCurrentUserProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadProfileAvatarMutation,
} = profileApi;
