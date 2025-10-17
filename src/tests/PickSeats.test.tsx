import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import PickSeats from "../components/PickSeats";

describe("PickSeats Component", () => {
  vi.mock("../utilites/fetchShowingTimes", () => ({
    fetchCall: vi.fn((type: string) => {
      if (type.includes("showings")) {
        return Promise.resolve({
          id: 1,
          film_id: 1,
          showing_time: "2024-10-12T19:00:00Z",
          theather_id: 1,
        });
      } else if (type.includes("theaters")) {
        return Promise.resolve({
          id: 1,
          name: "John Wayne Theater",
          location: "Newport Beach, CA",
        });
      } else if (type.includes("films")) {
        return Promise.resolve([
          {
            id: 1,
            title: "Chunnel",
            homepage: "http://example.com/chunnel",
            release_date: "2024-09-15",
            overview: "A thrilling journey through the Channel Tunnel.",
            poster_path: "/path/to/poster.jpg",
            runtime: 120,
            tagline: "The ultimate underground adventure.",
            popularity: 8.5,
            imdb_id: "tt1234567",
            vote_average: 7.8,
            vote_count: 1500,
          },
        ]);
      }

      return Promise.resolve(null);
    }),
    // fetchMovies: vi.fn(),
  }));

  function renderPickSeats() {
    const showingId = 1;
    const rootRoute = createRootRoute({
      component: () => (
        <QueryClientProvider client={new QueryClient()}>
          <PickSeats showingId={showingId} />
        </QueryClientProvider>
      ),
    });

    // Create a test route that renders PickSeats
    const homeRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/pickseats/:showingId",
      component: () => <PickSeats showingId={showingId} />,
    });

    const routeTree = rootRoute.addChildren([homeRoute]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    render(<RouterProvider router={router} />);
  }

  test("renders with show time", async () => {
    // Create a mock root route for testing
    renderPickSeats();
    const el = await screen.findByText(/checkout/i);
    const showTimeEl = await screen.findByText(/10\/12\/2024, 3:00:00 PM/i);
    expect(el).toBeInTheDocument();
    expect(showTimeEl).toBeInTheDocument();
  });

  test("renders with movie title", async () => {
    // Create a mock root route for testing
    renderPickSeats();
    const el = await screen.findByText(/checkout/i);
    const movieTitleEl = await screen.findByText(/chunnel/i);
    expect(el).toBeInTheDocument();
    expect(movieTitleEl).toBeInTheDocument();
  });

  test("renders with theater name", async () => {
    // Create a mock root route for testing
    renderPickSeats();
    const el = await screen.findByText(/checkout/i);
    const theaterNameEl = await screen.findByText(/john wayne theater/i);
    expect(el).toBeInTheDocument();
    expect(theaterNameEl).toBeInTheDocument();
  });
});
