import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "./types";

const url = "http://127.0.0.1:8000";

export const mempoolExplorerApi = createApi({
  reducerPath: "mempoolExplorerApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    searchForTransaction: builder.query<IResponse, string | null>({
      query: (txId) => `search?txid=${txId}`,
    }),
    recentTransactions: builder.query<string[], string | null>({
      query: (count) => `recent-transactions?count=${count}`,
    }),
  }),
});

export const { useSearchForTransactionQuery, useRecentTransactionsQuery } =
  mempoolExplorerApi;
