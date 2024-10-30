import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";
import {
  createTokenArgs,
  registerCustomerArgs,
  loginCustomerArgs,
} from "./types";
import getShopifyCustomer from "../../../app/utils/helpers/getShopifyCustomer";

let customerAccessToken;
if (typeof localStorage !== "undefined") {
  const localToken = localStorage.getItem("blissCustomerAccessToken");
  if (localToken !== null) {
    customerAccessToken = JSON.parse(localToken);
  } else {
    customerAccessToken = null;
  }
} else {
  customerAccessToken = null;
}
const initialState = {
  customerAccessToken,
  customer: { firstName: "", id: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCustomerAccessToken(state, action) {
      state.customerAccessToken = action.payload;
    },
    setCustomerData(state, action) {
      state.customer = action.payload;
    },
    logoutCustomer(state, action) {
      state.customer = { firstName: "", id: null };
      state.customerAccessToken = null;
    },
  },
});

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build: any) => ({
    creatCustomerToken: build.mutation({
      query: (arg: createTokenArgs) => ({
        document: `
          mutation {
            customerAccessTokenCreate(input: {email: "${arg.email}", password: "${arg.password}"})
            {
              customerAccessToken {
                accessToken
              }
              customerUserErrors {
                message
              }
            }
          }
        `,
      }),
      invalidatesTags: ["Customer"],
      async onQueryStarted(arg: any, lifecycleApi: any) {
        try {
          const response = await lifecycleApi.queryFulfilled;
          const cat =
            response.data.customerAccessTokenCreate.customerAccessToken;
          if (cat !== null) {
            lifecycleApi.dispatch(setCustomerAccessToken(cat.accessToken));
            localStorage.setItem(
              "blissCustomerAccessToken",
              JSON.stringify(cat.accessToken)
            );
            const customerData = await getShopifyCustomer(cat.accessToken);
            lifecycleApi.dispatch(setCustomerData(customerData.customer));
          }
        } catch (error) {
          console.log("some error occured creating access token", error);
        }
      },
    }),

    loginCustomer: build.query({
      query: (arg: loginCustomerArgs) => ({
        document: `
          query {
            customer(customerAccessToken: "${arg.customerAccessToken}") {
              id
              firstName
              lastName
              acceptsMarketing
              email
              phone
            }
          }
        `,
      }),
      providesTags: ["Customer"],
      async onQueryStarted(arg: any, lifecycleApi: any) {
        try {
          const { data: authData } = await lifecycleApi.queryFulfilled;
          if (authData.customer !== null) {
            lifecycleApi.dispatch(setCustomerData(authData.customer));
          } else if (authData.customer === null) {
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerCustomer: build.mutation({
      query: (arg: registerCustomerArgs) => ({
        document: `
          mutation customerCreate {
            customerCreate(input: {firstName: "${arg.firstName}", email: "${arg.email}", password:"${arg.password}"})
            {
            customer {
              firstName
              email
              acceptsMarketing
              id
            }
            customerUserErrors {
              message
              code
              }
            }
          }
        `,
      }),
      invalidatesTags: ["Customer", "Cart"],
    }),
  }),
});

export const selectAuthData = (state: RootState) => state.auth;

export const { setCustomerAccessToken, setCustomerData, logoutCustomer } =
  authSlice.actions;

export const {
  useRegisterCustomerMutation,
  useCreatCustomerTokenMutation,
  useLoginCustomerQuery,
} = extendedApi;

export default authSlice.reducer;
``;
