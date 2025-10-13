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
