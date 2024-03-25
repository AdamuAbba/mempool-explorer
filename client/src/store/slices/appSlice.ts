import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../types";

interface AppSliceInitialState {
  txId: string | null;
}

const initialState: AppSliceInitialState = {
  txId: null,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setTxid: (
      state,
      { payload }: PayloadAction<AppSliceInitialState["txId"]>
    ) => {
      state.txId = payload;
    },
  },
});

export const { setTxid } = appSlice.actions;

export const selectTxId = (state: RootState) => state.appSlice.txId;
