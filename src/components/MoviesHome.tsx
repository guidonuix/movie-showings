import type { MovieProps } from "../types/types";
import MovieCard from "./MovieCard";
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
      releaseDate: "2010-07-16",
      ratings: 8.8,
      votes: 2000000,
      url: "https://www.imdb.com/title/tt1375666/",
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
      releaseDate: "1999-03-31",
      ratings: 8.7,
      votes: 1700000,
      url: "https://www.imdb.com/title/tt0133093/",
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
      releaseDate: "2014-11-07",
      ratings: 8.6,
      votes: 1500000,
      url: "https://www.imdb.com/title/tt0816692/",
    },
  ];

  return (
    <>
      <header>
        <h1>Showings for {new Date().toLocaleDateString()}</h1>
        <div className="days-of-week">
            <div className='day'>Sun</div>
            <div className='day'>Mon</div>
            <div className='day'>Tue</div>
            <div className='day'>Wed</div>
            <div className='day'>Thu</div>
            <div className='day'>Fri</div>
            <div className='day'>Sat</div>
        </div>
      </header>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.filmId} {...movie} />
        ))}
      </div>
    </>
  );
}
