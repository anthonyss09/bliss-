import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";
import { gql } from "graphql-request";
import { getProductsArgs } from "./types";

const productsSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {},
});

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (arg: getProductsArgs) => ({
        document: gql`
          query {
            products(first: ${arg.first} last: ${arg.last} after: ${
          arg.after ? `"${arg.after}"` : null
        } before: ${arg.before ? `"${arg.before}"` : null}) {
              edges {
                cursor
                node {
                    title
                    tags
                    description
                    id
                    productType
                    priceRange {
                      maxVariantPrice {
                        amount
                      }
                    }
                }
              }
               pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor   
               } 
            }
          }
        `,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = extendedApi;

export default productsSlice.reducer;
