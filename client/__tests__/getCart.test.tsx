import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../src/app/utils/test-utils";
import Navbar from "../src/app/components/Navbar";
import CartPage from "../src/app/cart/page";

export const handlers = [
  http.post(
    `https://${process.env.NEXT_PUBLIC_SHOP_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_VERSION}/graphql.json`,
    () => {
      console.log("query intercepted");

      return HttpResponse.json({
        data: {
          customer: { firstName: "foobar", id: "111" },
          customerAccessTokenCreate: { customerAccessToken: "someToken" },
          customerCreate: { customer: { firstName: "foobar", id: "" } },
          cart: {
            lines: {
              edges: [
                {
                  node: {
                    attributes: [
                      { key: "key", value: "value" },
                      { key: "key", value: "value" },
                      {
                        key: "key",
                        value:
                          "https://cdn.shopify.com/s/files/1/0623/2168/8645/files/bottlesDouble.jpg?v=1730221070",
                      },
                    ],
                    quantity: 3,
                    merchandise: { id: "testId" },
                  },
                },
              ],
            },
            cost: {
              totalAmount: { amount: 0 },
              subtotalAmount: { amount: 0 },
            },
          },
        },
      });
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeEach(() => server.listen({ onUnhandledRequest: "bypass" }));

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterEach(() => server.close());

test("getCart query returns data and renders on CartPage", async () => {
  renderWithProviders(
    <>
      <Navbar />
      <CartPage />
    </>
  );

  await waitFor(async () => {
    const cartCount = screen.findByDisplayValue(3);
    expect(cartCount).toBeDefined();
  });
});
