//import { useEffect } from "react";
//import { useMoviesStore } from "../store/movieStore";
import DatePicker from "./DatePicker";
import MovieCard from "./MovieCard";
import "./MoviesHome.css";
import { useQuery } from "@tanstack/react-query";
import type { MovieType } from "../types/types";
export default function MoviesHome() {
  const { isPending, error, data } = useQuery<MovieType[]>({
    queryKey: ["films"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`).then((res) =>
        res.json()
      ),
  });

  // const { movies, setMovies } = useMoviesStore();
  //   const getMovies = () => {
  //     fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data); // 'data' is the parsed JSON object
  //         setMovies(data);
  //       });
  //   };
  //   useEffect(() => {
  //     getMovies();
  //   }, []);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="movies-home">
      <header>
        <DatePicker />
      </header>
      <div className="movies-grid">
        {data.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
