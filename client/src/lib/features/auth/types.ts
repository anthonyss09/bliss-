export interface createTokenArgs {
  email: string;
  password: string;
}

export interface loginCustomerArgs {
  customerAccessToken: string;
}

export interface registerCustomerArgs {
  firstName: string;
  email: string;
  password: string;
}
