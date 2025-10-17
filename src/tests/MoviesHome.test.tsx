import { render, screen } from "@testing-library/react";
import MoviesHome from "../components/MoviesHome";
import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

describe("MoviesHome Component", () => {
  test("renders without crashing", async () => {
    // Create a mock root route for testing
    const rootRoute = createRootRoute({
      component: () => (
        <QueryClientProvider client={new QueryClient()}>
          <MoviesHome />
        </QueryClientProvider>
      ),
    });

    // Create a test route that renders MoviesHome
    const homeRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: MoviesHome,
    });

    const routeTree = rootRoute.addChildren([homeRoute]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    render(<RouterProvider router={router} />);
    const el = await screen.findByText(/chunnel/i);
    expect(el).toBeInTheDocument();
  });
});
