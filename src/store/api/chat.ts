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
        body: { messageText: data.message },
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
    // likePost: builder.mutation<{}, string>({
    //   query: (data) => ({
    //     url: `posts/${data}/like`,
    //     method: "PUT",
    //   }),
    // }),
  }),
  overrideExisting: true,
});

export const {
  useGetContactsQuery,
  useGetChatByRoomQuery,
  useSendMessageMutation,
  useGetRoomByIdQuery,
  useInitiateChatMutation,
  useGetChatLengthsQuery
} = chatApi;
