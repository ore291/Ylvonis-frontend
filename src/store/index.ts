import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth"
import searchReducer from './slices/search'
import { api } from './api/root'


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search : searchReducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch