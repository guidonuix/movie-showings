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

export interface UserType {
  id?: number
  username: string
  password: string
  first: string
  last: string
  phone: string
  email: string
  imageUrl: string
  creditCard: CreditCardType
  adminUser: boolean
  isServer: boolean
}

export interface CreditCardType {
  pan: string
  expiryMonth: number
  expiryYear: number
}

export interface Theater {
  id: number
  name: string
  tables: Table[]
}

export interface Table {
  id: number
  table_number: number
  row: number
  column: number
  seats: Seat[]
}

export interface Seat {
  id: number
  seat_number: number
  price: number
}