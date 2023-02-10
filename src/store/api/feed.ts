// @ts-nocheck
import {api} from './root'

export interface Feed {}

export const feedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserFeed: builder.query<any, string>({
      query: (page) => `posts?page=${page}`,
      providesTags: ['Post']
    }),
    createPost: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: `posts`,
        method: 'POST',
        body : data,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   'Access-Control-Allow-Origin': '*',
        // },
      }),
      invalidatesTags: ['Post']
    }),
    likePost: builder.mutation<{}, string>({
      query: (data) => ({
        url: `posts/${data}/like`,
        method: 'PUT',  
      }), 
    }),
  }),
});


export const {useGetUserFeedQuery, useCreatePostMutation, useLikePostMutation} = feedApi;
