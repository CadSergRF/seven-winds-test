import { instantsApi } from './instants.api';

import { TCreateRowResponse, TRow, TRowCreate, TRowUpdate } from './../../utils/Types/smr.types';

export const productApi = instantsApi.injectEndpoints({
  endpoints: (builder) => ({
    getTreeRows: builder.query<TRow[], string>({
      query: () => `/list`,
      providesTags: () => [
        {
          type: 'Smr',
        },
      ],
    }),
    createRowInEntity: builder.mutation<TCreateRowResponse, TRowCreate>({
      query: (row) => ({
        body: row,
        url: '/create',
        method: 'POST',
      }),
      invalidatesTags: () => [
        {
          type: 'Smr',
        },
      ],
    }),
    updateRow: builder.mutation<TCreateRowResponse, TRowUpdate>({
      query: ({rID, updateData}) => ({
        body: updateData,
        url: `/admin/products/${rID}/update`,
        method: 'POST',
      }),
    }),
    deleteProduct: builder.mutation({
      query: (rId) => ({
        url: `${rId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Smr'],
    }),
  }),
});
