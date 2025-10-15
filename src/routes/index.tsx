import { createFileRoute, Link } from "@tanstack/react-router";
import MoviesHome from "../components/MoviesHome";
import '../index.css'

const Index = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <div>Dinner and a movie</div>
          <div className="login">
            <div>Login</div>
            <Link className='register' to="/register">Register</Link>
          </div>
        </nav>
      </header>
      <MoviesHome />
      <footer>Copyright ©2025</footer>
    </>
  );
};
export const Route = createFileRoute("/")({
  component: Index,
});
