import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { setRedisCustomer, getRedisCustomer } from "../../../services/redis";
import getShopifyCustomer from "../../../app/utils/helpers/getShopifyCustomer";
import type { RootState } from "../../store";
import { gql } from "graphql-request";
import { showAlert, clearAlert } from "../alerts/alertsSlice";
import { AddCartLineArgs, AddCartLineResponse, CartItem } from "./types";

let cartId;
let customerAccessToken: string | null;

async function getCustomerData() {
  const shopifyData = await getShopifyCustomer(customerAccessToken);
  const redisCustomer = await getRedisCustomer(shopifyData.customer.id);
  cartId = redisCustomer?.cartId || null;
  localStorage.setItem("blissCartId", JSON.stringify(cartId));
  return cartId;
}

if (typeof localStorage !== "undefined") {
  const blissToken = localStorage.getItem("blissCustomerAccessToken");
  customerAccessToken = blissToken ? JSON.parse(blissToken) : null;

  if (customerAccessToken) {
    getCustomerData();
  }
  const blissCartId = localStorage.getItem("blissCartId");
  cartId = blissCartId ? JSON.parse(blissCartId) : "gid://shopify/Cart/null";
} else {
  cartId = "gid://shopify/Cart/null";
  customerAccessToken = null;
}

const initialState = {
  cartLoading: true,
  cartCount: 0,
  cartId,
  cartData: {
    cart: {
      lines: { edges: [] },
      cost: { totalAmount: { amount: 0 }, subtotalAmount: { amount: 0 } },
    },
  },
  customerAccessToken,
};

const extendedApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    addCartLine: build.mutation<AddCartLineResponse, AddCartLineArgs>({
      query: ({
        cartId,
        productTitle,
        variantTitle,
        featuredImageUrl,
        merchandiseId,
        quantity,
      }) => ({
        document: gql`
          mutation {
            cartLinesAdd(cartId: "${cartId}", lines: {merchandiseId: "${merchandiseId}" quantity: ${quantity} attributes: [{key: "title" value: "${productTitle}"},{key: "variantTitle" value: "${variantTitle}"}, {key: "featuredImageUrl" value: "${featuredImageUrl}"} ]}) {
              cart {
                id
              }
            }
          }
        `,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showAlert({
              alertMessage: "Item added to cart!",
              alertType: "success",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
        } catch (error) {
          let errorMessage;
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (
            typeof error === "object" &&
            error !== null &&
            "error" in error &&
            typeof error.error === "object" &&
            error.error !== null &&
            "message" in error.error
          ) {
            errorMessage = error.error.message;
          }
          dispatch(
            showAlert({
              alertMessage: errorMessage,
              alertType: "danger",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
          console.log("some error occured adding cart line.", error);
        }
      },
      invalidatesTags: ["Cart", "Customer"],
    }),

    createCart: build.mutation({
      query: ({
        merchandiseId,
        productTitle,
        variantTitle,
        featuredImageUrl,
      }) => ({
        document: gql`
          mutation {
            cartCreate(input:{lines: [{quantity: 1, merchandiseId: "${merchandiseId}", attributes: [{key: "title" value: "${productTitle}"}, {key: "variantTitle" value: "${variantTitle}"},{key: "featuredImageUrl" value: "${featuredImageUrl}"}
      ]}]}) {
              cart {
                id
                createdAt
                updatedAt
                attributes {
                  key
                  value
                }
              }
            }
          }
        `,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: cartData } = await queryFulfilled;
          dispatch(
            showAlert({
              alertMessage: "Item added to cart!",
              alertType: "success",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
          dispatch(setCartId(cartData.cartCreate?.cart?.id));
          const state = getState() as RootState;
          const customer = state.auth.customer;
          if (customer.id !== null) {
            const redisResponse = await setRedisCustomer({
              customerId: customer.id || "",
              cartId: cartData.cartCreate?.cart?.id,
            });
            console.log("redis response", redisResponse);
          } else {
            localStorage.setItem(
              "blissCartId",
              JSON.stringify(cartData.cartCreate.cart.id)
            );
          }
        } catch (error) {
          let errorMessage;
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (
            typeof error === "object" &&
            error !== null &&
            "error" in error &&
            typeof error.error === "object" &&
            error.error !== null &&
            "message" in error.error
          ) {
            errorMessage = error.error.message;
          }
          dispatch(
            showAlert({
              alertMessage: errorMessage,
              alertType: "danger",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
          console.log("some error occured creating cart", error);
        }
      },
      invalidatesTags: ["Cart", "Customer"],
    }),

    getCart: build.query({
      query: (id) => ({
        document: gql`query {
          cart(id: "${id}") {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
          cost {
              totalAmount {
                amount 
                currencyCode
              }
              subtotalAmount {
                amount 
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: cartData } = await queryFulfilled;
          if (cartData.cart !== null) {
            let cartCount = 0;
            cartData.cart.lines.edges.map((item: CartItem) => {
              cartCount += item.node.quantity;
            });
            dispatch(setCartId(cartData.cart.id));
            dispatch(setCartCount(cartCount));
            dispatch(setCartData(cartData));
          }
          dispatch(setCartLoading(false));
        } catch (error) {
          console.log("An error occured fetching cart.", error);
          dispatch(setCartLoading(false));
        }
      },
      providesTags: ["Cart"],
    }),

    updateCartLine: build.mutation({
      query: ({
        cartId,
        productTitle,
        variantTitle,
        featuredImageUrl,
        lineId,
        merchandiseId,
        quantity,
        message,
      }) => ({
        document: gql`
          mutation {
            cartLinesUpdate(cartId: "${cartId}", lines: {id: "${lineId}" merchandiseId: "${merchandiseId}" quantity: ${quantity} attributes: [{key: "title" value: "${productTitle}"},{key: "variantTitle" value: "${variantTitle}"}, {key: "featuredImageUrl" value: "${featuredImageUrl}"}, {key: "message" value: "${message}"} ]}) {
              cart {
                id
              }
            }
          }
        `,
      }),
      async onQueryStarted({ message }, { dispatch, queryFulfilled }) {
        try {
          const { data: cartData } = await queryFulfilled;
          console.log(cartData);
          dispatch(
            showAlert({
              alertMessage: message,
              alertType: "success",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
        } catch (error) {
          let errorMessage;
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (
            typeof error === "object" &&
            error !== null &&
            "error" in error &&
            typeof error.error === "object" &&
            error.error !== null &&
            "message" in error.error
          ) {
            errorMessage = error.error.message;
          }
          dispatch(
            showAlert({
              alertMessage: errorMessage,
              alertType: "danger",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert());
          }, 2000);
          console.log("some error occured adding cart line.", error);
        }
      },
      invalidatesTags: ["Cart", "Customer"],
    }),
  }),
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId(state, action) {
      state.cartId = action.payload;
    },
    setCartData(state, action) {
      state.cartData = action.payload;
    },
    setCartCount(state, action) {
      state.cartCount = action.payload;
    },
    setCartLoading(state, action) {
      state.cartLoading = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { setCartId, setCartData, setCartCount, setCartLoading } =
  cartSlice.actions;

export const selectCartData = (state: RootState) => state.cart;

export const {
  useCreateCartMutation,
  useGetCartQuery,
  useAddCartLineMutation,
  useUpdateCartLineMutation,
} = extendedApi;
