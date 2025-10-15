export type MovieType = {
  id: number;
  title: string;
  homepage: string;
  release_date: string;
  overview: string;
  poster_path: string;
  runtime: number;
  tagline: string;
  popularity: number;
  imdb_id: string;
  vote_average: number;
  vote_count: number;
};

export interface ShowtimeType {
  id: number;
  film_id: number;
  theater_id: number;
  showing_time: string;
}

export interface CartItem {
  filmId: number;
  showingTime: string;
  quantity: number;
}