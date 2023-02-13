// @ts-nocheck
import { api } from "./root";

export interface Feed {}

export const feedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserFeed: builder.query<any, string>({
      query: (page) => `posts?page=${page}`,
      providesTags: ["Post"],
    }),
    getUserProfilePost: builder.query<any, number>({
      query: (page) => `posts/profile/?page=${page}`,
      providesTags: ["Post"],
    }),
    getUserNotifications: builder.query({
      query: ({ page = 1, size = 10 }) =>
        `posts/notifications/?page=${page}&size=${size}`,
    }),
    createPost: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: `posts`,
        method: "POST",
        body: data,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   'Access-Control-Allow-Origin': '*',
        // },
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<{}, string>({
      query: (data) => ({
        url: `posts/${data}/like`,
        method: "PUT",
      }),
    }),
    repostPost: builder.mutation<{ status: string; message: string }, string>({
      query: (data) => ({
        url: `posts/${data}/repost`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetUserFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useGetUserNotificationsQuery,
  useRepostPostMutation,
  useGetUserProfilePostQuery
} = feedApi;
