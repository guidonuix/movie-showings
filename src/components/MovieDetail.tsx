import type { MovieType } from "../types/types";
import "./MovieDetail.css";
import ShowTimes from "./ShowTimes";

export default function MovieDetail({
  title,
  runtime,
  overview,
  tagline,
  poster_path,
  id,
}: MovieType) {
  return (
    <div className="movie-detail">
      <div className="card-header">
        <img src={poster_path} alt={`${title} poster`} />
        <div className="card-header-text">
          <h1>{title}</h1>
          <p className="duration">Duration: {runtime} minutes</p>

          <h2>{tagline}</h2>
          <p>{overview}</p>

          <ShowTimes filmId={id} />
        </div>
      </div>
    </div>
  );
}
