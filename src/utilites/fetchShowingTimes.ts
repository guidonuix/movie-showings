
  export function fetchShowingTimes() {
    return fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/films`).then((res) =>
      res.json()
    );
  }

  export function fetchMovies(){
    const showtimes = fetchShowingTimes();
    return showtimes;
  }