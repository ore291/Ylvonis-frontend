// @ts-nocheck
import { api } from "./root";

export const artistAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<any, number>({
      query: (size) => `artists/?size=${size}`,
      providesTags: ["Artists"],
    }),
    likeArtist: builder.mutation<{}, string>({
      query: (data) => ({
        url: `artists/${data}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Artists"],
    }),
    followArtist: builder.mutation<{}, string>({
      query: (data) => ({
        url: `artists/${data}/follow`,
        method: "PUT",
      }),
      invalidatesTags: ["Artists"],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useLikeArtistMutation,
  useFollowArtistMutation,
} = artistAPi;
