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
import PickArea from "./PickArea";

const renderComponent = () => {
const rootRoute = createRootRoute({
      component: () => (
        <QueryClientProvider client={new QueryClient()}>
          <PickArea />
        </QueryClientProvider>
      ),
    });

    // Create a test route that renders PickArea
    const homeRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: PickArea,
    });

    const routeTree = rootRoute.addChildren([homeRoute]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    render(<RouterProvider router={router} />);
}

describe("PickArea", ()=>{
    test("should display theater names,", async ()=>{
        // Arrange
        // Act
        renderComponent();
        // Assert
        expect(await screen.findByText(/John Wayne Theater/i)).toBeInTheDocument();
    })
})