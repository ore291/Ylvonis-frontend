import axios from "axios";
import { setUploadProgress } from "../slices/search";
// @ts-nocheck
import { api } from "./root";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ page = 1, limit = 100 }) => `chats`,
      providesTags: ["Chat"],
    }),
    getChatLengths: builder.query({
      query: () => `chats/length`,
      providesTags: ["Chat"],
    }),
    getChatByRoom: builder.query({
      query: (roomId) => `chats/${roomId}`,
    }),
    deleteMedia: builder.mutation({
      query: (fileId) => ({ url: `chats/upload/${fileId}`, method: "DELETE" }),
    }),
    getRoomById: builder.query({
      query: (roomId) => `chats/single/${roomId}`,
    }),

    initiateChat: builder.mutation({
      query: (user_id) => ({
        url: `chats/initiate`,
        method: "POST",
        body: { userIds: new Array(user_id) },
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `chats/${data.roomId}/message`,
        method: "POST",
        body: { messageText: data.message, fileData: data.fileData },
      }),
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data: updatedPost } = await queryFulfilled;

      //     dispatch(
      //       chatApi.util.updateQueryData(
      //         "getChatByRoom",
      //         updatedPost.post.chatRoomId,
      //         (draft) => {

      //           draft?.push(updatedPost.post);
      //         }
      //       )
      //     );
      //   } catch {
      //     (error) => console.log(error);
      //   }
      // },
    }),
    upload: builder.mutation({
      queryFn: async ({ url, data }, api) => {
        try {
          const result = await axios.post(url, data, {
            //...other options like headers here
            onUploadProgress: (upload) => {
              //Set the progress value to show the progress bar
              let uploadloadProgress = Math.round(
                (100 * upload.loaded) / upload?.total
              );
              api.dispatch(setUploadProgress(uploadloadProgress));
            },
          });
          return { data: result.data };
        } catch (axiosError) {
          let err = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetContactsQuery,
  useGetChatByRoomQuery,
  useSendMessageMutation,
  useGetRoomByIdQuery,
  useInitiateChatMutation,
  useGetChatLengthsQuery,
  useUploadMutation,
  useDeleteMediaMutation
} = chatApi;
