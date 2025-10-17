import { createFileRoute } from "@tanstack/react-router";
import MoviesHome from "../components/MoviesHome";
import WaitersHome from "../components/WaitersHome";
import "../index.css";

const Index = () => {
  return (
    <>
      <WaitersHome />
      {/* <MoviesHome /> */}
    </>
  );
};
export const Route = createFileRoute("/")({
  component: Index,
});
