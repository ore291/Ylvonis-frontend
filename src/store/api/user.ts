// @ts-nocheck
import { api } from "./root";

export interface Feed {}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users/profile/`,
    }),
    getUserByUsername: builder.query({
      query: (username) => `users/profile/${username}`,
    }),
    getDiscoveredUser: builder.query({
      query: () => `users/discover/`,
      providesTags: ["User"],
    }),
    followUser: builder.mutation<{}, string>({
      query: (data) => ({
        url: `users/${data}/follow`,
        method: "PUT",
      }),
      invalidatesTags: ['User']
    }),
    unFollowUser: builder.mutation<{}, string>({
      query: (data) => ({
        url: `users/${data}/unfollow`,
        method: "PUT",
      }),
      invalidatesTags: ['User']
    }),
    updateProfile: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: `users/update-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetUserQuery,
  useGetDiscoveredUserQuery,
  useUpdateProfileMutation,
  useGetUserByUsernameQuery
} = userApi;
