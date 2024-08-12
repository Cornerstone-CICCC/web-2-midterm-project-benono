export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  adult: boolean
  vote_average: number
  vote_count: number
  genre_ids: number[]
  media_type: MediaType
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  tagline: string
  overview: string
  budget: number
  revenue: number
  runtime: number
  genres: Genre[]
  origin_country: string[]
  production_companies: ProductionCompany[]
  credits: Credits
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  gender: number
  order: number
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
  gender: number
}
export interface TV {
  id: number
  name: string
  overview: string
  poster_path: string | null
  release_date: string
  adult: boolean
  vote_average: number
  vote_count: number
  genre_ids: number[]
  media_type: MediaType
}

export interface TVDetail extends Omit<TV, 'genre_ids'> {
  tagline: string
  overview: string
  budget: number
  revenue: number
  runtime: number
  genres: Genre[]
  origin_country: string[]
  production_companies: ProductionCompany[]
  credits: Credits
}

export interface Person {
  id: number
  name: string
  profile_path: string | null
  media_type: MediaType
}

export interface FetchMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface FetchTVResponse {
  page: number
  results: TV[]
  total_pages: number
  total_results: number
}

export interface FetchPeopleResponse {
  page: number
  results: Person[]
  total_pages: number
  total_results: number
}

export interface SearchPersonResponse {
  page: number
  results: Person[]
  total_pages: number
  total_results: number
}

export interface SearchMultiResponse {
  page: number
  results: (Movie | TV | Person)[]
  total_pages: number
  total_results: number
}

export interface PersonMovieCredits {
  id: number
  cast: Movie[]
  crew: {
    id: number
    department: string
    job: string
    credit_id: string
    adult: boolean
    gender: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    release_date: string
  }[]
}

export interface Genre {
  id: number
  name: string
}

//export type MediaType = 'movies' | 'tvShows' | 'people'

export enum MediaType {
  movie = 'movie',
  tv = 'tv',
  people = 'people',
  multi = 'multi',
}

export interface SearchParams {
  type?: MediaType
  page?: string
  year?: string
  adult?: boolean
}

export function getMainCast(credits: Credits, limit: number = 5): Cast[] {
  return credits.cast.sort((a, b) => a.order - b.order).slice(0, limit)
}

export function getDirectorAndWriter(credits: Credits): Crew[] {
  return credits.crew.filter(
    (crewMember) =>
      crewMember.job === 'Director' ||
      crewMember.job === 'Screenplay' ||
      crewMember.job === 'Writer'
  )
}
