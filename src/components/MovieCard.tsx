import "./MovieCard.css";
import ShowTimes from "./ShowTimes";

export type MovieProps = {
  title: string;
  duration: number; // duration in minutes
  description: string;
  summary: string;
  posterUrl: string;
  filmId: number;
  showTimes: string[];
  releaseDate?: string;
  ratings: number;
  votes: number;
  url: string;
};

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
