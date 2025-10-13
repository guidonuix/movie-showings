import MovieCard from "./MovieCard";
import type { MovieProps } from "./MovieCard";
import "./MoviesHome.css";

export default function MoviesHome() {
  const movies: MovieProps[] = [
    {
      title: "Inception",
      duration: 148,
      description: "",
      summary:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      filmId: 1,
      showTimes: ["1:00 PM", "4:00 PM", "7:00 PM"],
    },
    {
      title: "The Matrix",
      duration: 136,
      description: "",
      summary:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png",
      filmId: 2,
      showTimes: ["2:00 PM", "5:00 PM", "8:00 PM"],
    },
    {
      title: "Interstellar",
      duration: 169,
      description: "",
      summary:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
      filmId: 3,
      showTimes: ["3:00 PM", "6:00 PM", "9:00 PM"],
    },
  ];

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.filmId} {...movie} />
      ))}
    </div>
  );
}
