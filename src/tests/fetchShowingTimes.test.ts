import { describe, expect, test, vi } from "vitest";
vi.mock("../utilites/fetchShowingTimes", async () => {
  const actual = await vi.importActual<
    typeof import("../utilites/fetchShowingTimes")
  >("../utilites/fetchShowingTimes");

  return {
    ...actual,
    fetchShowingTimes: vi.fn(() =>
      Promise.resolve([
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ])
    ),
  };
});
import * as showingTimes from "../utilites/fetchShowingTimes";

describe("fetch showing times", () => {
  vi.mock("../utilites/fetchShowingTimes", () => ({
    fetchShowingTimes: vi.fn(() =>
      Promise.resolve([
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ])
    ),
    // fetchMovies: vi.fn(),
  }));
  test("fetch showing times", async () => {
    // Arrange
    // Act
    const data = await showingTimes.fetchShowingTimes();
    // Assert
    expect(data).toEqual([
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
    ]);
  });
});
