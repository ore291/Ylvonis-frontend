// @ts-nocheck
import {api} from './root'

export interface Feed {}

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<any, string>({
      query: (title) => `songs/search?title=${title}`,
    }),
    
  }),
});


export const {useSearchQuery} = searchApi;
