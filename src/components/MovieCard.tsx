import type { MovieProps } from "../types/types";
import "./MovieCard.css";
import ShowTimes from "./ShowTimes";


export default function MovieCard({
  title,
  duration,
  summary,
  posterUrl,
  filmId,
}: MovieProps) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={posterUrl} alt={`${title} poster`} height={150} width={100} />
        <div className="card-header-text">
          <h1>{title}</h1>
          <p className="duration">Duration: {duration} minutes</p>
        </div>
      </div>
      <p>{summary}</p>
      <ShowTimes selectedDate={new Date()} filmId={filmId} />
    </div>
  );
}
