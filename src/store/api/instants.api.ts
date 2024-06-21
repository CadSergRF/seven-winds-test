import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const E_ID = 128599;
const BASE_URL = `http://185.244.172.108:8081/v1/outlay-rows/entity/${E_ID}/row`;
export const ROWNAME = "e0a5ad6d-0732-4804-8b29-9f0af343882f";

export const instantsApi = createApi({
  reducerPath: 'instantsApi',
  tagTypes: ['Smr'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: () => ({}),
});
