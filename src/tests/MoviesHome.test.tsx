import { render, screen } from "@testing-library/react";
import MoviesHome from "../components/MoviesHome";
import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("MoviesHome Component", () => {
  test("renders without crashing", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MoviesHome />
      </QueryClientProvider>
    );
    const el = await screen.findByText(/chunnel/i);
    expect(el).toBeInTheDocument();
  });
});
