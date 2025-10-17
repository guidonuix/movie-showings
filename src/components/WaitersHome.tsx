//import { useEffect } from "react";
//import { useMoviesStore } from "../store/movieStore";
//import DatePicker from "./DatePicker";
//import MovieCard from "./MovieCard";
import "./WaitersHome.css";
import { useQuery } from "@tanstack/react-query";
import type { MovieType } from "../types/types";
import useAuth from "../hooks/useAuth";
import { Link } from "@tanstack/react-router";
export default function MoviesHome() {
  const { isPending, error, data } = useQuery<MovieType[]>({
    queryKey: ["films"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`).then((res) =>
        res.json()
      ),
  });

  const { user, isAuthenticated } = useAuth();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="waiters-home">
      <div className="waiters-container">
        <header>Dinner and a Movie</header>
        <h3>Server's site</h3>
        {isAuthenticated ? (
          <div className="waiter-authenticated">
            <div className="welcome">Welcome {user?.first}</div>
          </div>
        ) : (
          <div className="waiter-unauthenticated">
            <div className="welcome">
              Welcome, you are not logged in. Click
              <Link className="login-button" to="/waiterslogin">
                here
              </Link>
              to log in.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
