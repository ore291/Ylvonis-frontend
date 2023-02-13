import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


async function getToken() {
  const session = await getSession();
  return session?.accessToken;
}





export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl, // e.g. https://yourapi.com
    
    prepareHeaders: async (headers, { getState }) => {
      const access_token = await getToken();

     

      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }

      // headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ['Post', 'Playlist', 'Song', 'User', 'Chat', 'Comments','Replies', 'Artists'],
  endpoints: () => ({}),
  reducerPath: "api",
  //   tagTypes: ["Game"],
});
