import type { MovieType } from "../types/types";
import "./MovieCard.css";
import ShowTimes from "./ShowTimes";

export default function MovieCard({
  title,
  runtime,
  tagline,
  poster_path,
  id,
}: MovieType) {
  return (
    <div className="card">
      <div className="movie-card">
        <div className="card-header">
          <img
            src={import.meta.env.VITE_DATABASE_ROOT_URL + poster_path}
            alt={`${title} poster`}
            height={150}
            width={100}
          />
          <div className="card-header-text">
            <h1>{title}</h1>
            <p className="duration">Duration: {runtime} minutes</p>
          </div>
        </div>
        <p>{tagline}</p>
      </div>
      <ShowTimes filmId={id} />
    </div>
  );
}
