import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://127.0.0.1:8000";

export const mempoolExplorerApi = createApi({
  reducerPath: "mempoolExplorerApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    searchForTransaction: builder.query({
      query: (txId) => `search?txid=${txId}`,
    }),
  }),
});

export const { useSearchForTransactionQuery } = mempoolExplorerApi;
