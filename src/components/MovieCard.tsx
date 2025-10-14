import type { MovieProps } from "../types/types";
import "./MovieCard.css";
import ShowTimes from "./ShowTimes";

export default function MovieCard({
  title,
  runtime,
  tagline,
  poster_path,
  id,
  selectedDate,
}: MovieProps & { selectedDate: string }) {
  return (
    <div className="card">
      <div className="card-header">
        <img
          src={"http://localhost:3008/" + poster_path}
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
      <ShowTimes selectedDate={selectedDate} filmId={id} />
    </div>
  );
}
