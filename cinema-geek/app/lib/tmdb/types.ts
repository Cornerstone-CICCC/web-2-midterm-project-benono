export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  adult: boolean
  vote_average: number
  vote_count: number
  media_type: MediaType
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
  media_type: MediaType
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
