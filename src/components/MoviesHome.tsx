import { useEffect } from "react";
import DatePicker from "./DatePicker";
import MovieCard from "./MovieCard";
import "./MoviesHome.css";
import { useMoviesStore } from "../store/movieStore";

export default function MoviesHome() {
  const { movies, setMovies } = useMoviesStore();

  const getMovies = () => {
    fetch("http://localhost:3008/films")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 'data' is the parsed JSON object
        setMovies(data);
      });
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movies-home">
      <header>
        <DatePicker />
      </header>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
