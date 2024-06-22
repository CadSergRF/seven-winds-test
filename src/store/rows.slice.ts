import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TRow } from '../utils/Types/smr.types';
import { smrApi } from './api/smr.api';
interface rowsView {
  rows: TRow[];
  isError: string;
}

const initialState: rowsView = {
  rows: [],
  isError: ''
};

export const rowsViewSlice = createSlice({
  name: 'rowsView',
  initialState,
  reducers: {
    setInitial(state, action: PayloadAction<TRow[]>) {
      state.rows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(
      smrApi.endpoints.getTreeRows.matchFulfilled,
      (state, { payload }) => {
        state.rows = payload;
        state.isError = '';
      }
    )
    .addMatcher(
      smrApi.endpoints.getTreeRows.matchRejected,
      (state) => {
        state.isError = 'Ошибка загрузки данных';
      }
    )
    .addMatcher(
      smrApi.endpoints.updateRow.matchFulfilled,
      (state, { payload }) => {
        console.log(state.rows.find((item) => item.id === payload.current.id))
        console.log('slice ', state)
      }
    )
  },
});

export default rowsViewSlice.reducer;
