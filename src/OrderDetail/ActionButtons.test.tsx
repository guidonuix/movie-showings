import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActionButtons from "./ActionButtons";
import type { OrderType } from "../types/types";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("ActionButtons Component", () => {
  const testOrder: OrderType = {
    id: 1,
    status: "completed",
    items: [],
    tax: 0,
    tip: 0,
    orderTime: "",
    pickupTime: "",
    area: "",
    location: "",
    userId: 1,
    creditCard: { pan: "", expiryYear: 2025, expiryMonth: 1 },
  };

  test("should have no action buttons when completed", () => {
    // Test the completed status (default case returns null)
    const order = { ...testOrder, status: "completed" };
    renderWithQueryClient(<ActionButtons status="completed" order={order} />);

    // Assert no buttons are rendered
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("should show 'Picked up' and 'Problem' buttons when status is readyForGuest", () => {
    const order = { ...testOrder, status: "readyForGuest" };
    renderWithQueryClient(
      <ActionButtons status="readyForGuest" order={order} />
    );

    expect(
      screen.getByRole("button", { name: /picked up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /problem/i })
    ).toBeInTheDocument();
  });

  test("should show 'Delivered' and 'Problem' buttons when status is pickedUp", () => {
    const order = { ...testOrder, status: "pickedUp" };
    renderWithQueryClient(<ActionButtons status="pickedUp" order={order} />);

    expect(
      screen.getByRole("button", { name: /delivered/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /problem/i })
    ).toBeInTheDocument();
  });

  test("should show only 'Problem' button when status is delivered", () => {
    const order = { ...testOrder, status: "delivered" };
    renderWithQueryClient(<ActionButtons status="delivered" order={order} />);

    expect(
      screen.getByRole("button", { name: /problem/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delivered/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /picked up/i })
    ).not.toBeInTheDocument();
  });
});

// If you need to test a component that uses React Query, here are additional examples:

/*
// Example 1: Mock useQuery hook directly
import * as ReactQuery from '@tanstack/react-query';

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

// Then in your test:
test("should render with mocked query data", () => {
  const mockUseQuery = vi.mocked(ReactQuery.useQuery);
  mockUseQuery.mockReturnValue({
    data: { id: 1, status: "readyForGuest" },
    isPending: false,
    error: null,
    isError: false,
    isSuccess: true,
  } as any);

  // render your component...
});

// Example 2: Mock fetch responses
test("should handle successful API response", async () => {
  const mockOrderData = {
    id: 1,
    status: "readyForGuest",
    items: []
  };

  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => mockOrderData,
  } as Response);

  // render component and test...
});

// Example 3: Mock with different states
test("should handle loading state", () => {
  const mockUseQuery = vi.mocked(ReactQuery.useQuery);
  mockUseQuery.mockReturnValue({
    data: undefined,
    isPending: true,
    error: null,
    isError: false,
    isSuccess: false,
  } as any);

  // test loading state...
});

test("should handle error state", () => {
  const mockUseQuery = vi.mocked(ReactQuery.useQuery);
  mockUseQuery.mockReturnValue({
    data: undefined,
    isPending: false,
    error: new Error("Failed to fetch"),
    isError: true,
    isSuccess: false,
  } as any);

  // test error state...
});
*/
