import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../src/app/utils/test-utils";
import ContactPage from "../src/app/contact/page";
import Navbar from "../src/app/components/Navbar";
import Carousel from "../src//app/components/Carousel";

export const handlers = [
  http.post(`/api/v1/contact`, () => {
    console.log("query intercepted");

    return HttpResponse.json({
      contactResponse: { message: "test successful" },
    });
  }),
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
                      ,
                      { key: "key", value: "value" },
                    ],
                    quantity: 3,
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

test("graphql client returns data and component renders data", async () => {
  renderWithProviders(
    <>
      <Carousel />
    </>
  );

  const chevronRight = screen.getByAltText("chevron arrow right");
  expect(chevronRight).toBeDefined();
});
