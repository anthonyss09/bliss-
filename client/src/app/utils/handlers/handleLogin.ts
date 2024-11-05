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
    } catch (error) {}
  } else {
    const response = await createCustomerToken({
      email: email,
      password: password,
    });
  }
}
