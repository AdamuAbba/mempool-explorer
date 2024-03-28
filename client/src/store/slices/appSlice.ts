import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../types";

interface AppSliceInitialState {
  txId: string | null;
  recentTxCount: string | null;
}

const initialState: AppSliceInitialState = {
  txId: null,
  recentTxCount: "6",
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
    setRecentTxCount: (
      state,
      { payload }: PayloadAction<AppSliceInitialState["recentTxCount"]>
    ) => {
      state.recentTxCount = payload;
    },
  },
});

export const { setTxid, setRecentTxCount } = appSlice.actions;

export const selectTxId = (state: RootState) => state.appSlice.txId;
export const selectRecentTxCount = (state: RootState) =>
  state.appSlice.recentTxCount;
