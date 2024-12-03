import { createSlice } from "@reduxjs/toolkit";
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
    getProduct: build.query({
      query: (id: string | null) => ({
        document: gql`
          query {
            product(id: "${id}") {
              title
              productType
              tags
              description
              id
              variants(first: 1) {
                      nodes {
                        id
                      }
                    }
              featuredImage {
                url
              }
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        `,
      }),
    }),
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
                    variants(first: 1) {
                      nodes {
                        id
                      }
                    }
                    featuredImage {
                      url
                    }
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

export const { useGetProductsQuery, useGetProductQuery } = extendedApi;

export default productsSlice.reducer;
