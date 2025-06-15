'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostType } from '@/types';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { RootState } from '../index';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const blogApi = createApi({
  reducerPath: 'bloglistApi',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/blog/' }),
  endpoints: (build) => ({
    getBlogAll: build.query<PostType, void>({ query: () => '' }),
    getBlogSelected: build.query<PostType, string>({ query: (id) => `single/${id}` }),
  }),
});

export const { useGetBlogSelectedQuery, useGetBlogAllQuery } = blogApi;
