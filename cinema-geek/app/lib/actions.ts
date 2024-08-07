'use server'

import {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchTrendingPeople,
} from './tmdb'

export async function fetchMoreTrending(
  type: 'movies' | 'tvShows' | 'people',
  page: number
) {
  switch (type) {
    case 'movies':
      const movieData = await fetchTrendingMovies(page)
      return { results: movieData.results, totalPages: movieData.total_pages }
    case 'tvShows':
      const tvData = await fetchTrendingTV(page)
      return { results: tvData.results, totalPages: tvData.total_pages }
    case 'people':
      const peopleData = await fetchTrendingPeople(page)
      return { results: peopleData.results, totalPages: peopleData.total_pages }
  }
}
