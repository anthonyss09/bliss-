import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    url: `https://${process.env.NEXT_PUBLIC_SHOP_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set(
        "X-Shopify-Storefront-Access-Token",
        process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
          ? process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
          : ""
      );
      return headers;
    },
  }),

  tagTypes: ["Cart", "Customer"],
  endpoints: () => ({}),
});
