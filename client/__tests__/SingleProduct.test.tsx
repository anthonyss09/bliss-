import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../src/app/utils/test-utils";
import SingleProduct from "../src/app/products/single-product/page";

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
          product: {
            description: "test description",
            id: "testId",
            priceRange: { maxVariantPrice: { amount: "testPrice" } },
            productType: "testProductType",
            tags: ["tag", "tag", "tag"],
            title: "testTitle",
          },
          products: {
            edges: [
              {
                cursor: null,
                node: {
                  description: "test description",
                  id: "testId",
                  priceRange: { maxVariantPrice: { amount: "testPrice" } },
                  productType: "testProductType",
                  tags: ["tag", "tag", "tag"],
                  title: "testTitle",
                },
              },
            ],
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
            },
          },
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
      <SingleProduct />
    </>
  );

  await waitFor(() => {
    const testProductTitle = screen.getByText("testTitle");
    expect(testProductTitle).toBeDefined();
  });
});
