import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createRedisCustomer, getRedisCustomer } from "../../../services/redis";
import getShopifyCustomer from "../../../app/utils/helpers/getShopifyCustomer";
import type { RootState } from "../../store";

var cartId;
var customerAccessToken: string | null;

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
  cartCount: 0,
  cartId,
  cartData: null,
};

const extendedApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    cartLinesAdd: build.mutation({
      query: ({
        cartId,
        quantity,
        productTitle,
        variantTitle,
        productImageUrl,
        merchandiseId,
      }) => ({
        document: `mutation {
        cartLinesAdd(
          cartId: "${cartId}"
    lines: {
      merchandiseId: "${merchandiseId}"
      quantity: ${quantity}
      attributes: [
      {
          key: "title"
          value: "${productTitle}"
          },
          {
          key: "variantTitle"
          value: "${variantTitle}"
          },
           {
          key: "imageUrl"
          value: "${productImageUrl}"
          }
      ]
    }
        ) {
    cart {
        id
   }
           userErrors {
      field
      message
    }}
        }`,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(
        { cartId, lines },
        { dispatch, queryFulfilled, getState }
      ) {
        const { data: cartData } = await queryFulfilled;
        console.log("something happened updating", cartData);
      },
    }),
    updateCartLine: build.mutation({
      query: ({
        cartId,
        lineId,
        quantity,
        productTitle,
        productImageUrl,
        variantTitle,
      }) => ({
        document: `mutation {
  cartLinesUpdate(
    cartId: "${cartId}"
    
    lines: {
      id: "${lineId}"

      quantity: ${quantity}
      attributes: [
      {
          key: "title"
          value: "${productTitle}"
          },
          {
          key: "variantTitle"
          value: "${variantTitle}"
          },
           {
          key: "imageUrl"
          value: "${productImageUrl}"
          }
      ]
    }
  ) {
    cart {
        id
   }
           userErrors {
      field
      message
    }
  }
}
`,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(
        { cartId, lineId, quantity, productTitle, productImageUrl },
        { dispatch, queryFulfilled, getState }
      ) {
        const { data: cartData } = await queryFulfilled;
        console.log("something happened updating", cartData);
        // console.log("the og keys", lineId, quantity);
      },
    }),

    getCart: build.query({
      query: (sessionId) => ({
        document: `query  {
  cart(id:"${sessionId}") {
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
      async onQueryStarted(sessionId, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: cartData } = await queryFulfilled;
          if (cartData.cart !== null) {
            console.log(cartData);
            dispatch(setCartData(cartData.cart));
            dispatch(setCartId(cartData.cart.id));
            let cartCount = 0;
            cartData.cart.lines.edges.map((edge: any) => {
              cartCount += edge.node.quantity;
            });
            dispatch(setCartCount(cartCount));
          } else if (cartData.cart === null) {
            console.log("cartdata.cart", cartData.cart);
            dispatch(setCartData(cartData.cart));
            dispatch(setCartCount(0));
            // localStorage.removeItem("performanceCartId");
          }
        } catch (error) {
          console.log("some error occured", error);
        }
      },
      providesTags: ["Cart"],
    }),

    createCart: build.mutation({
      query: ({
        merchandiseId,
        productTitle,
        variantTitle,
        productImageUrl,
      }) => ({
        document: `mutation {
        cartCreate(input: {
          lines: [
            {
              quantity: 1,
              merchandiseId: "${merchandiseId}",
               attributes: [{
          key: "title"
          value: "${productTitle}"
          },
          {key: "variantTitle" value: "${variantTitle}"},
          {
          key: "imageUrl"
          value: "${productImageUrl}"
          }]
            },
  
          ],
         
        }) { cart{
         id
        createdAt
        updatedAt  
        attributes {
        key 
        value
        }
        }
        }
        }`,
      }),
      async onQueryStarted(
        { merchId, productTitle, productImageUrl },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const { data: cartData } = await queryFulfilled;
          dispatch(setCartId(cartData.cartCreate.cart.id));
          const state = getState() as RootState;
          const customer = state.auth.customer;
          if (customer !== null) {
            const redisResponse = await createRedisCustomer({
              customerId: customer.id || "",
              cartId: cartData.cartCreate.cart.id,
            });
            console.log(redisResponse);
          } else {
            localStorage.setItem(
              "performanceCartId",
              JSON.stringify(cartData.cartCreate.cart.id)
            );
          }
        } catch (error) {
          console.log("some error occured", error);
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
    // addItemToCart(state, action) {
    //   if (state.cartItemsMap[action.payload]) {
    //     state.cartItemsMap[action.payload]++;
    //   } else {
    //     state.cartItemsMap[action.payload] = 1;
    //   }
    //   state.cartCount++;
    // },
    // removeItemFromCart(state, action) {
    //   if (state.cartItemsMap[action.payload] <= 1) {
    //     delete state.cartItemsMap[action.payload];
    //   } else {
    //     state.cartItemsMap[action.payload]--;
    //   }
    //   state.cartCount--;
    // },
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

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartLineMutation,
  useCartLinesAddMutation,
} = extendedApi;
