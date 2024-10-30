import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../src/app/utils/test-utils";
import LoginForm from "../src/app/components/LoginForm";
import AccountCenter from "../src/app/components/AccountCenter";

export const handlers = [
  http.post(
    `https://${process.env.NEXT_PUBLIC_SHOP_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`,
    () => {
      console.log("query intercepted");

      return HttpResponse.json({
        data: {
          customer: { firstName: "foobar", id: "111" },
          customerAccessTokenCreate: { customerAccessToken: "someToken" },
          customerCreate: { customer: { firstName: "", id: "" } },
        },
      });
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeEach(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterEach(() => server.close());

test("graphql client returns data and component renders data", async () => {
  renderWithProviders(
    <>
      <LoginForm formOpen={true} toggleForm={() => {}} />
      <AccountCenter formOpen={true} />
    </>
  );

  const email: HTMLInputElement = screen.getByLabelText("Email");
  const password: HTMLInputElement = screen.getByLabelText("Password");
  fireEvent.change(email, { target: { value: "test1@gmail.com" } });
  fireEvent.change(password, { target: { value: "123456" } });
  fireEvent.click(screen.getAllByText("Login")[1]);

  expect(password.value).toBe("123456");
  expect(email.value).toBe("test1@gmail.com");

  await waitFor(() => {
    const p = screen.getByText("Welcome back foobar!");
    expect(p).toBeDefined();
  });
});
