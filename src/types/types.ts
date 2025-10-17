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

export interface TheaterType {
  id: number
  name: string
  tables: TableType[]
}

export interface TableType {
  id: number
  table_number: number
  row: number
  column: number
  seats: SeatType[]
}

export interface SeatType {
  id: number
  seat_number: number
  price: number
}

export interface OrderType {
  id: number
  userId: number
  orderTime: string
  pickupTime: string
  area: string
  location: string
  tax: number
  tip: number
  creditCard: CreditCardType
  items: ItemType[]
  status: string
}

export interface ItemType {
  id: number
  itemId: number
  price: number
  firstName: string
  notes?: string
}

export interface MenuItemType {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  available: boolean
}