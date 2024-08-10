import {
  FetchMoviesResponse,
  FetchTVResponse,
  FetchPeopleResponse,
  SearchPersonResponse,
  PersonMovieCredits,
  SearchMultiResponse,
  MovieDetail,
} from './types'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  console.log(`url: ${url.toString()}`)
  console.log('X')
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  console.log(url.toString())

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    })

    if (!response.ok) {
      console.log(response)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data from TMDB:', error)
    throw error
  }
}

// Trending
export async function fetchTrendingMovies(
  page: number = 1
): Promise<FetchMoviesResponse> {
  const data = await fetchTMDB<FetchMoviesResponse>('/trending/movie/day', {
    page: page.toString(),
  })
  return data
}

export async function fetchTrendingTV(
  page: number = 1
): Promise<FetchTVResponse> {
  const data = await fetchTMDB<FetchTVResponse>('/trending/tv/day', {
    page: page.toString(),
  })
  return data
}

export async function fetchTrendingPeople(
  page: number = 1
): Promise<FetchPeopleResponse> {
  const data = await fetchTMDB<FetchPeopleResponse>('/trending/person/day', {
    page: page.toString(),
  })
  return data
}

// Search
export async function searchMovies(
  query: string,
  adult: boolean = false,
  year: string = ''
): Promise<FetchMoviesResponse> {
  return fetchTMDB<FetchMoviesResponse>(`/search/movie`, {
    query,
    include_adult: adult.toString(),
    language: 'en-US',
    year: year,
  })
}

export async function searchTVs(
  query: string,
  adult: boolean = false,
  year: string = ''
): Promise<FetchTVResponse> {
  return fetchTMDB<FetchTVResponse>(`/search/tv`, {
    query,
    include_adult: adult.toString(),
    language: 'en-US',
    year: year,
  })
}

export async function searchPeople(
  query: string
): Promise<SearchPersonResponse> {
  return fetchTMDB<SearchPersonResponse>('/search/person', {
    query,
    include_adult: 'false',
    language: 'en-US',
  })
}

export async function searchMulti(
  query: string,
  page: number
): Promise<SearchMultiResponse> {
  return fetchTMDB<SearchMultiResponse>('/search/multi', {
    query,
    page: page.toString(),
    include_adult: 'false',
    language: 'en-US',
  })
}

export async function fetchMovieById(movieId: string): Promise<MovieDetail> {
  return fetchTMDB<MovieDetail>(`/movie/${movieId}`, {
    language: 'en-US',
    append_to_response: 'credits',
  })
}
