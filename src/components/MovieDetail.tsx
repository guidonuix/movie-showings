import { useMoviesStore } from "../store/movieStore";
import type { MovieType } from "../types/types";
import "./MovieDetail.css";
import ShowTimes from "./ShowTimes";

export default function MovieDetail({ id }: MovieType) {
  const { movies, setMovies } = useMoviesStore();
  const movie = movies.filter((movie) => movie.id === id)[0];
  return (
    <div className="movie-detail">
      <div className="card-header">
        <img src={movie.poster_path} alt={`${movie.title} poster`} />
        <div className="card-header-text">
          <h1>{movie.title}</h1>
          <p className="duration">Duration: {movie.runtime} minutes</p>

          <h2>{movie.tagline}</h2>
          <p>{movie.overview}</p>

          <ShowTimes filmId={movie.id} />
        </div>
      </div>
    </div>
  );
}
