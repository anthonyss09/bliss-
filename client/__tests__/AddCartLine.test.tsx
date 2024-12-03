import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../src/app/utils/test-utils";
import SingleProduct from "../src/app/products/single-product/page";
import Navbar from "../src/app/components/Navbar";

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
            featuredImage: { url: "https://testUrl.com" },
            priceRange: { maxVariantPrice: { amount: "testPrice" } },
            productType: "testProductType",
            tags: ["tag", "tag", "tag"],
            title: "testTitle",
            variants: { nodes: [{ id: "testId" }] },
          },
          products: {
            edges: [
              {
                cursor: null,
                node: {
                  description: "test description",
                  id: "testId",
                  featuredImage: { url: "https://testUrl.com" },
                  priceRange: { maxVariantPrice: { amount: "testPrice" } },
                  productType: "testProductType",
                  tags: ["tag", "tag", "tag"],
                  title: "testTitle",
                  variants: { nodes: [{ id: "testId" }] },
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
          cart: {
            id: "gid://shopify/Cart/!null",
            lines: {
              edges: [
                {
                  node: {
                    merchandise: { id: "testId" },
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

test("add cart line mutation", async () => {
  renderWithProviders(
    <>
      <SingleProduct />
      <Navbar />
    </>
  );

  await waitFor(async () => {
    fireEvent.click(screen.getAllByText("Add to cart")[0]);
    const testProductTitle = screen.getAllByText("testTitle");
    expect(testProductTitle[0]).toBeDefined();
    await waitFor(() => {
      const successAlert = screen.getByText("Item added to cart!");
      expect(successAlert).toBeDefined();
    });
  });
});
