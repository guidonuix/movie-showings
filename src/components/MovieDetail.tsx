//import { useEffect, useState } from "react";
//import { useMoviesStore } from "../store/movieStore";
import type { MovieType } from "../types/types";
import "./MovieDetail.css";
import ShowTimes from "./ShowTimes";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export default function MovieDetail({ id }: { id: number }) {
  // const { movies, setMovies } = useMoviesStore();
  // const [movie, setMovie] = useState<MovieType | null>(null);
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery<MovieType[]>({
    queryKey: ["films"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`).then((res) =>
        res.json()
      ),
  });

  //   useEffect(() => {
  //     if (movies.length === 0) {
  //       fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setMovies(data);
  //           setMovie((data as MovieType[]).filter((m) => m.id === id)[0]);
  //         });
  //     } else {
  //       setMovie(movies.filter((m) => m.id === id)[0]);
  //     }
  //   }, [id, movies, setMovies]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  const movie = data?.find((m) => m.id === id) || null;

  return (
    <div className="movie-detail">
      <div className="back-button" onClick={() => navigate({ to: "/" })}>
        &lt; Back
      </div>
      <div className="detail">
        <div className="card-header">
          <img
            src={import.meta.env.VITE_DATABASE_ROOT_URL + movie?.poster_path}
            alt={`${movie?.title} poster`}
          />
          <div className="card-header-text">
            <h1>{movie?.title}</h1>
            <p className="duration">Duration: {movie?.runtime} minutes</p>

            <h2>{movie?.tagline}</h2>
            <p>{movie?.overview}</p>

            <ShowTimes filmId={movie?.id || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
