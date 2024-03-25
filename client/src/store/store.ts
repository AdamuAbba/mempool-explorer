import { configureStore } from "@reduxjs/toolkit";
import { mempoolExplorerApi } from "../services";
import { appSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [mempoolExplorerApi.reducerPath]: mempoolExplorerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mempoolExplorerApi.middleware),
});
