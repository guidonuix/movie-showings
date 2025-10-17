import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { describe, expect, test } from "vitest";
import PickOrder from "./PickOrder";

const renderComponent = () => {
  const rootRoute = createRootRoute({
    component: () => (
      <QueryClientProvider client={new QueryClient()}>
        <PickOrder />
      </QueryClientProvider>
    ),
  });

  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: PickOrder,
  });

  const routeTree = rootRoute.addChildren([homeRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });

  render(<RouterProvider router={router} />);
};

describe("PickOrder", () => {
  test("should display My Orders title", () => {
    renderComponent();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
  });
});
