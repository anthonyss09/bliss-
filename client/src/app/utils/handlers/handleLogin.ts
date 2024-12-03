// import isEmail from "../helpers/isEmail";
// import {
//   setRedisCustomer,
//   getRedisCustomer,
//   RedisObject,
// } from "../../../services/redis";
// import { setCartId } from "../../../lib/features/cart/cartSlice";
// import { AppDispatch } from "../../../lib/store";
// import getShopifyCustomer from "../helpers/getShopifyCustomer";
// import {
//   CreateTokenArgs,
//   CreateTokenResponse,
//   RegisterCustomerArgs,
//   RegisterCustomerResponse,
// } from "../../../lib/features/auth/types";

// export interface args {
//   handleCreateToken: (
//     args: CreateTokenArgs
//   ) => Promise<CreateTokenResponse> | undefined;
//   handleRegisterCustomer: (
//     args: RegisterCustomerArgs
//   ) => Promise<RegisterCustomerResponse> | undefined;
//   firstName: string;
//   email: string;
//   password: string;
//   isLogin: boolean;
//   dispatch: AppDispatch;
// }

// export default async function handleLogin({
//   handleCreateToken,
//   handleRegisterCustomer,
//   email,
//   password,
//   isLogin,
//   firstName,
//   dispatch,
// }: args) {
//   if (!email || !password) {
//     throw new Error("Please fill out all fields.");
//   }
//   if (!isEmail(email)) {
//     throw new Error("Please enter a valid email address.");
//   }
//   if (!isLogin) {
//     try {
//       const response = await handleRegisterCustomer({
//         firstName,
//         email,
//         password,
//       });
//       const customerId = response.data.customerCreate.customer.id;
//       await handleCreateToken({
//         email: email,
//         password: password,
//       });
//       const redisCustomer = await setRedisCustomer({
//         customerId,
//         cartId: "gid://shopify/Cart/null",
//       });
//       console.log("the custi", redisCustomer);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     try {
//       const response = await handleCreateToken({
//         email: email,
//         password: password,
//       });
//       const token =
//         response.data.customerAccessTokenCreate.customerAccessToken.accessToken;
//       const shopifyData = await getShopifyCustomer(token);
//       const redisCustomer: RedisObject | null = await getRedisCustomer(
//         shopifyData.customer.id
//       );
//       if (redisCustomer) {
//         dispatch(setCartId(redisCustomer.cartId));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
