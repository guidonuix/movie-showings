import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PickOrder from "./PickOrder";

vi.mock("../store/selectedTheaterStore", () => ({
  useSelectedTheaterStore: vi.fn(() => ({
    selectedTheaterId: 1,
  })),
}));

vi.mock("../hooks/useAuth", () => ({
  default: vi.fn(() => ({
    user: { id: 1, name: "Test User" },
    isAuthenticated: true,
  })),
}));

const renderComponent = () => {
  return render(
    <QueryClientProvider client={new QueryClient({})}>
      <PickOrder />
    </QueryClientProvider>
  );
};

describe("PickOrder", () => {
  test("should display My Orders title", async () => {
    const { findByText } = renderComponent();
    expect(await findByText(/My orders/i)).toBeInTheDocument();
  });
});
