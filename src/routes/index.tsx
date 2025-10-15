import { createFileRoute } from "@tanstack/react-router";
import MoviesHome from "../components/MoviesHome";
import "../index.css";

const Index = () => {
  return (
    <>
      <MoviesHome />
    </>
  );
};
export const Route = createFileRoute("/")({
  component: Index,
});
