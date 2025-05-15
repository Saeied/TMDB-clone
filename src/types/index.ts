export interface MovieProps {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  tagline: string;
  origin_country: string[];
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  backdrop_path: string;
  revenue: number;
  budget: number;
  vote_average: number;
  status: string;
  release_date: string;
  runtime: number;
}

export interface TvShowProps
  extends Omit<
    MovieProps,
    | "title"
    | "original_title"
    | "revenue"
    | "budget"
    | "release_date"
    | "runtime"
  > {
  name: string;
  original_name: string;
  first_air_date: string;
}

export interface Person {
  id: number;
  name: string;
  known_for_department: string;
  known_for: { title?: string; name?: string }[];
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string;
  popularity: number;
}

export interface Cast extends Omit<Crew, "job"> {
  character: string;
  order: number;
}
