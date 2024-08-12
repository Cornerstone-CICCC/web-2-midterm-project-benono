'use server'

import {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchTrendingPeople,
  searchMulti,
  searchMovies,
  searchTVs,
  searchPeople,
  Movie,
  TV,
  Person,
  MediaType,
} from './tmdb'

export async function fetchTrendingAction(type: MediaType, page: number) {
  switch (type) {
    case MediaType.movie:
      const movieData = await fetchTrendingMovies(page)
      return { results: movieData.results, totalPages: movieData.total_pages }
    case MediaType.tv:
      const tvData = await fetchTrendingTV(page)
      return { results: tvData.results, totalPages: tvData.total_pages }
    case MediaType.people:
      const peopleData = await fetchTrendingPeople(page)
      return { results: peopleData.results, totalPages: peopleData.total_pages }
  }
}

export async function searchAction(
  query: string,
  page: number,
  type: MediaType,
  optionalParams?: {
    adult?: boolean
    year?: string
  }
): Promise<{
  results: Movie[] | TV[] | Person[] | (Movie | TV | Person)[]
  totalPages: number
}> {
  switch (type) {
    case MediaType.movie:
      const movieData = await searchMovies(
        query,
        optionalParams?.adult,
        optionalParams?.year
      )
      const movieResults = movieData.results.map((result) => {
        return {
          ...result,
          media_type: MediaType.movie,
        }
      })
      return { results: movieResults, totalPages: movieData.total_pages }
    case MediaType.tv:
      const tvData = await searchTVs(
        query,
        optionalParams?.adult,
        optionalParams?.year
      )
      const tvResults = tvData.results.map((result) => {
        return {
          ...result,
          media_type: MediaType.tv,
        }
      })
      return { results: tvResults, totalPages: tvData.total_pages }
    case MediaType.people:
      const peopleData = await searchPeople(query)
      const peopleResults = peopleData.results.map((result) => {
        return {
          ...result,
          media_type: MediaType.people,
        }
      })
      return { results: peopleResults, totalPages: peopleData.total_pages }

    case MediaType.multi:
      const multiData = await searchMulti(query, page)
      // exept people in multi data
      const filteredData = multiData.results.filter(
        (result) => result.media_type !== MediaType.people
      )
      return { results: filteredData, totalPages: multiData.total_pages }
  }
}
