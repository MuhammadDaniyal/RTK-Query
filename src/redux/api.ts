import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query - 1st way

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes:['Posts'],
  endpoints: (builder) => ({
    // just like action in redux
    // <result type, query parameter type>
    getPost: builder.query<Post[], string>({ query: () => `posts`, providesTags:['Posts'] }), // issy data cache bh hojaega
    newPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body:post
      }),
      // redvalidate with tags
      invalidatesTags:['Posts']
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetPostQuery, useNewPostMutation } = postsApi;
