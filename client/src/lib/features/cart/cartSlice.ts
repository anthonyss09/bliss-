import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { setRedisCustomer, getRedisCustomer } from "../../../services/redis";
import getShopifyCustomer from "../../../app/utils/helpers/getShopifyCustomer";
import type { RootState } from "../../store";
import { gql } from "graphql-request";
import { showAlert, clearAlert } from "../alerts/alertsSlice";

var cartId;
var customerAccessToken: string | null;

async function getCustomerData() {
  const shopifyData = await getShopifyCustomer(customerAccessToken);
  const redisCustomer: any = await getRedisCustomer(shopifyData.customer.id);
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
  cartCount: 0,
  cartId,
  cartData: null,
  customerAccessToken,
};

const extendedApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
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
      async onQueryStarted(
        { merchId, productTitle, productImageUrl },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data: cartData } = await queryFulfilled;
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
          const errorMessage = error.error
            ? error.error.message.slice(0, 18)
            : error.message;
          dispatch(
            showAlert({
              alertMessage: errorMessage,
              alertType: "danger",
            })
          );
          setTimeout(() => {
            dispatch(clearAlert({}));
          }, 2000);
          console.log("some error occured creating cart", error);
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
  },
});

export default cartSlice.reducer;

export const { setCartId, setCartData, setCartCount } = cartSlice.actions;

export const selectCartData = (state: RootState) => state.cart;

export const { useCreateCartMutation } = extendedApi;
