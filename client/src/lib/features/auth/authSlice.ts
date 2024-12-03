import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";
import {
  CreateTokenArgs,
  RegisterCustomerArgs,
  LoginCustomerArgs,
  CreateTokenResponse,
  RegisterCustomerResponse,
} from "./types";
import getShopifyCustomer from "../../../app/utils/helpers/getShopifyCustomer";
import { showAlert, clearAlert } from "../alerts/alertsSlice";
import { gql } from "graphql-request";
import { setCartId } from "../cart/cartSlice";
import { getRedisCustomer } from "../../../services/redis";

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
    logoutCustomer(state) {
      state.customer = { firstName: "", id: null };
      state.customerAccessToken = null;
    },
  },
});

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCustomerToken: build.mutation<CreateTokenResponse, CreateTokenArgs>({
      query: (arg: CreateTokenArgs) => ({
        document: gql`
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (
            response.data.customerAccessTokenCreate.customerUserErrors &&
            response.data.customerAccessTokenCreate.customerUserErrors.length
          ) {
            throw new Error(
              response.data.customerAccessTokenCreate.customerUserErrors[0].message
            );
          }
          const cat =
            response.data.customerAccessTokenCreate.customerAccessToken;
          if (cat !== null) {
            dispatch(setCustomerAccessToken(cat.accessToken));
            localStorage.setItem(
              "blissCustomerAccessToken",
              JSON.stringify(cat.accessToken)
            );
            const customerData = await getShopifyCustomer(cat.accessToken);
            dispatch(setCustomerData(customerData.customer));
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
          console.log("some error occured creating access token", error);
        }
      },
    }),

    loginCustomer: build.query({
      query: (arg: LoginCustomerArgs) => ({
        document: gql`
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: authData } = await queryFulfilled;
          if (authData.customer !== null) {
            dispatch(setCustomerData(authData.customer));
            const redisCustomer = await getRedisCustomer(authData.customer.id);
            if (redisCustomer !== null) {
              dispatch(setCartId(redisCustomer.cartId));
            }
            if (localStorage.getItem("blissCartId")) {
              localStorage.removeItem("blissCartId");
            }
          } else if (authData.customer === null) {
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerCustomer: build.mutation<
      RegisterCustomerResponse,
      RegisterCustomerArgs
    >({
      query: (arg) => ({
        document: gql`
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log("the response,", response);
          if (
            response.data.customerCreate.customerUserErrors &&
            response.data.customerCreate.customerUserErrors.length
          ) {
            throw new Error(
              response.data.customerCreate.customerUserErrors[0].message
            );
          }
          if (response.data.customerCreate.customer !== null) {
            dispatch(setCustomerData(response.data.customerCreate.customer));
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
          console.log("some error occured registering customer.", error);
          return;
        }
      },
    }),
  }),
});

export const selectAuthData = (state: RootState) => state.auth;

export const { setCustomerAccessToken, setCustomerData, logoutCustomer } =
  authSlice.actions;

export const {
  useRegisterCustomerMutation,
  useCreateCustomerTokenMutation,
  useLoginCustomerQuery,
} = extendedApi;

export default authSlice.reducer;
