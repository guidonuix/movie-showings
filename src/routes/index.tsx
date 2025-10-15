import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import MoviesHome from "../components/MoviesHome";
import '../index.css'

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <MoviesHome />
    </>
  );
};
export const Route = createFileRoute("/")({
  component: Index,
});
