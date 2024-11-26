import isEmail from "../helpers/isEmail";
import { setRedisCustomer, getRedisCustomer } from "../../../services/redis";
import { setCartId, setCartData } from "../../../lib/features/cart/cartSlice";
import { AppDispatch } from "../../../lib/store";
import getShopifyCustomer from "../helpers/getShopifyCustomer";

export interface args {
  createCustomerToken: any;
  registerCustomer: any;
  firstName: string;
  email: string;
  password: string;
  isLogin: boolean;
  dispatch: AppDispatch;
}

export default async function handleLogin({
  createCustomerToken,
  registerCustomer,
  email,
  password,
  isLogin,
  firstName,
  dispatch,
}: args) {
  if (!email || !password) {
    throw new Error("Please fill out all fields.");
  }
  if (!isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!isLogin) {
    try {
      const response = await registerCustomer({ firstName, email, password });
      const customerId = response.data.customerCreate.customer.id;
      const newCustomerToken = await createCustomerToken({
        email: email,
        password: password,
      });
      const redisCustomer = await setRedisCustomer({
        customerId,
        cartId: "gid://shopify/Cart/null",
      });
      console.log("the custi", redisCustomer);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await createCustomerToken({
        email: email,
        password: password,
      });
      const token =
        response.data.customerAccessTokenCreate.customerAccessToken.accessToken;
      const shopifyData = await getShopifyCustomer(token);
      const redisCustomer: any = await getRedisCustomer(
        shopifyData.customer.id
      );
      dispatch(setCartId(redisCustomer.cartId));
    } catch (error) {}
  }
}
