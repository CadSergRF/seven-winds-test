import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TNewChildRow, TRow } from "../utils/Types/smr.types";
import { smrApi } from "./api/smr.api";
import { recursiveCreate, recursiveDelete, recursiveUpdate } from "../utils/recursive";
interface rowsView {
  rows: TRow[];
  isError: string;
}

const initialState: rowsView = {
  rows: [],
  isError: "",
};

export const rowsViewSlice = createSlice({
  name: "rowsView",
  initialState,
  reducers: {
    setInitial(state, action: PayloadAction<TRow[]>) {
      state.rows = action.payload;
    },
    createRow(state, action: PayloadAction<TNewChildRow>) {
      state.rows = recursiveCreate(state.rows, action.payload.parentId, action.payload.newRow)
    },
    updateRow(state, action: PayloadAction<TRow>) {
      state.rows = recursiveUpdate(state.rows, action.payload)
    },
    deleteRow(state, action: PayloadAction<number>) {
      state.rows = recursiveDelete(state.rows, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        smrApi.endpoints.getTreeRows.matchFulfilled,
        (state, { payload }) => {
          state.rows = payload;
          state.isError = "";
        }
      )
      .addMatcher(smrApi.endpoints.getTreeRows.matchRejected, (state) => {
        state.isError = "Ошибка загрузки данных";
      })
  },
});

export default rowsViewSlice.reducer;
