import isEmail from "../helpers/isEmail";

export interface args {
  createCustomerToken: any;
  registerCustomer: any;
  firstName: string;
  email: string;
  password: string;
  isLogin: boolean;
}

export default async function handleLogin({
  createCustomerToken,
  registerCustomer,
  email,
  password,
  isLogin,
  firstName,
}: args) {
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
    } catch (error) {
      console.log("the error", error);
    }
  } else {
    try {
      const response = await createCustomerToken({
        email: email,
        password: password,
      });
      const customerAccessTokenData = response.data.customerAccessTokenCreate;
      if (customerAccessTokenData.customerAccessToken === null) {
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log("the error", error);
    }
  }
}
