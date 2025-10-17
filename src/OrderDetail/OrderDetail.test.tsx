import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import OrderDetail from "./OrderDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("OrderDetail Component", () => {

    const renderComponent = (orderId: number) => {
        return render(
            <QueryClientProvider client={new QueryClient({})}>
                <OrderDetail orderId={orderId} />
            </QueryClientProvider>
        );
    };

  test("should render without crashing", () => {
    renderComponent(1);
  });

  test("should display correct content", async () => {
    const { findByText } = renderComponent(1);
    expect(await findByText(/Order/i)).toBeInTheDocument();
  });
});
