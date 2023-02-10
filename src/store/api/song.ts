// @ts-nocheck
import { api } from "./root";

export interface Feed {}

export const songApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<any>({
      query: () => `songs/genre/`,
    }),
    getRecentSongs: builder.query({
      query: () => `songs/recent/`,
    }),
    getTrendingSongs: builder.query({
      query: () => `songs/trending/`,
    }),
    getRecentPlayists: builder.query({
      query: () => `playlists/recent/`,
    }),
  
    getUserPlaylist: builder.query({
      query: () => `playlists/`,
      providesTags: ["Playlist"],
    }),
    getUserLikedPlaylist: builder.query({
      query: () => `playlists/like/`,
      providesTags: ["Playlist"],
    }),
    getUserSubscribedPlaylist: builder.query({
      query: () => `playlists/subscribe/`,
      providesTags: ["Playlist"],
    }),
    getUserSongs: builder.query({
      query: () => `songs/library/`,
      providesTags: ["Song"],
    }),
    getUserLikedSongs: builder.query({
      query: () => `songs/liked/`,
      providesTags: ["Song"],
    }),
    getSinglePlaylist: builder.query({
      query: (id) => `playlists/${id}/`,
    }),
    getAllSongs: builder.query<any, any>({
      query: ({ page = 1, country = "all", limit = 5 }) =>
        `songs?page=${page}&location=${country}&size=${limit}/`,
      providesTags: ["Song"],
    }),
    createPlaylist: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: `playlists/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),
    addToPlaylist: builder.mutation<{}>({
      query: ({ playlist_id, song_id }) => ({
        url: `playlists/song/${playlist_id}/`,
        method: "PUT",
        body: { song: song_id },
      }),
      invalidatesTags: ["Playlist"],
    }),
    likeSong: builder.mutation<any, String>({
      query: (song_id) => ({
        url: `songs/like/${song_id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Song"],
    }),
    likePlaylist: builder.mutation<any, String>({
      query: (playlist_id) => ({
        url: `playlists/like/${playlist_id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Playlist"],
    }),
    subscribePlaylist: builder.mutation<any, String>({
      query: (playlist_id) => ({
        url: `playlists/subscribe/${playlist_id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Playlist"],
    }),
    uploadSong: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: `songs/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Song"],
    }),
  }),
});

export const {
  useAddToPlaylistMutation,
  useGetAllSongsQuery,
  useGetUserSongsQuery,
  useUploadSongMutation,
  useGetGenresQuery,
  useCreatePlaylistMutation,
  useGetUserPlaylistQuery,
  useGetSinglePlaylistQuery,
  useLikeSongMutation,
  useGetUserLikedSongsQuery,
  useLikePlaylistMutation,
  useSubscribePlaylistMutation,
  useGetUserLikedPlaylistQuery,
  useGetUserSubscribedPlaylistQuery,
  useGetRecentSongsQuery,
  useGetRecentPlayistsQuery,
  useGetTrendingSongsQuery
} = songApi;
