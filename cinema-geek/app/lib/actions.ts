'use server'

import {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchTrendingPeople,
  searchMovie,
  searchTV,
  searchPerson,
  MediaType,
} from './tmdb'

export async function fetchTrendingAction(type: MediaType, page: number) {
  switch (type) {
    case MediaType.movie:
      const movieData = await fetchTrendingMovies(page)
      return { results: movieData.results, totalPages: movieData.total_pages }
    case MediaType.tvShow:
      const tvData = await fetchTrendingTV(page)
      return { results: tvData.results, totalPages: tvData.total_pages }
    case MediaType.people:
      const peopleData = await fetchTrendingPeople(page)
      return { results: peopleData.results, totalPages: peopleData.total_pages }
  }
}

export async function searchAction(query: string, type: MediaType) {
  switch (type) {
    case MediaType.movie:
      const movieData = await searchMovie(query)
      return { results: movieData.results, totalPages: movieData.total_pages }
    case MediaType.tvShow:
      const tvData = await searchTV(query)
      return { results: tvData.results, totalPages: tvData.total_pages }
    case MediaType.people:
      const peopleData = await searchPerson(query)
      return { results: peopleData.results, totalPages: peopleData.total_pages }
  }
}
