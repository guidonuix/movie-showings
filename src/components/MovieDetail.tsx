import type { MovieProps } from "../types/types";
import "./MovieDetail.css";
import ShowTimes from "./ShowTimes";

export default function MovieDetail({
  title,
  duration,
  description,
  summary,
  posterUrl,
  filmId,
}: MovieProps) {
  return (
    <div className="movie-detail">
      <div className="card-header">
        <img src={posterUrl} alt={`${title} poster`} />
        <div className="card-header-text">
          <h1>{title}</h1>
          <p className="duration">Duration: {duration} minutes</p>

          <h2>{summary}</h2>
          <p>{description}</p>

          <ShowTimes selectedDate={new Date()} filmId={filmId} />
        </div>
      </div>
    </div>
  );
}
