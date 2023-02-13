// @ts-nocheck
import { api } from "./root";



export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query<any, string>({
      query: (id) => `comment/${id}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `comment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    likeComment: builder.mutation<{}, string>({
      query: (data) => ({
        url: `comment/${data}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Comments"],
    }),
    getCommentReplies: builder.query<any, string>({
      query: (id) => `replies/${id}`,
      providesTags: ["Replies"],
    }),
    addCommentReply: builder.mutation({
      query: (data) => ({
        url: `replies`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Replies"],
    }),
    likeCommentReply: builder.mutation<{}, string>({
      query: (data) => ({
        url: `replies/${data}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Replies"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetPostCommentsQuery,
  useLikeCommentMutation,
  useGetCommentRepliesQuery,
  useAddCommentReplyMutation,
  useLikeCommentReplyMutation
} = commentApi;
