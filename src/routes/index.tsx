import { createFileRoute } from "@tanstack/react-router";
import MoviesHome from "../components/MoviesHome";
import "../index.css";
import '../global.css'


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
