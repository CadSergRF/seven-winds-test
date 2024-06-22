import { instantsApi } from './instants.api';

import { TCreateRowResponse, TRow, TRowCreate, TRowUpdate } from './../../utils/Types/smr.types';

export const smrApi = instantsApi.injectEndpoints({
  endpoints: (builder) => ({
    getTreeRows: builder.query<TRow[], void>({
      query: () => `/list`,
      providesTags: () => ['Smr'],
    }),
    createRowInEntity: builder.mutation<TCreateRowResponse, TRowCreate>({
      query: (row) => ({
        body: row,
        url: '/create',
        method: 'POST',
      }),
    }),
    updateRow: builder.mutation<TCreateRowResponse, TRowUpdate>({
      query: ({rID, updateData}) => ({
        body: updateData,
        url: `/${rID}/update`,
        method: 'POST',
      }),

    }),
    deleteRow: builder.mutation({
      query: (rId) => ({
        url: `${rId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});
