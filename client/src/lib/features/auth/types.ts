export interface CreateTokenArgs {
  email: string;
  password: string;
}

export interface CreateTokenResponse {
  customerAccessTokenCreate: {
    customerAccessToken: { accessToken: string };
    customerUserErrors: Array<{ message: string }>;
  };
}

export interface LoginCustomerArgs {
  customerAccessToken: string;
}

export interface RegisterCustomerArgs {
  firstName: string;
  email: string;
  password: string;
}

export interface RegisterCustomerResponse {
  customerCreate: {
    customer: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    customerUserErrors: Array<{ message: string }>;
  };
  customerUserErrors: [{ message: string }, { message: string }];
}
