import { TrendingMoviesResponse, SearchPersonResponse, PersonMovieCredits, Movie } from './types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    console.log(url.toString())

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw error;
    }
}

export async function fetchTrendingMovies(): Promise<TrendingMoviesResponse> {
    return fetchTMDB<TrendingMoviesResponse>('/trending/movie/day');
}

export async function searchMovie(query: string): Promise<Movie> {
    return fetchTMDB<Movie>(`/search/movie`, { query, include_adult: 'false', language: 'en-US' });
}

export async function searchSimilarMovies(movieId: number): Promise<Movie> {
    return fetchTMDB<Movie>(`/movie/${movieId}/similar`, { language: 'en-US' });
}

export async function searchPerson(query: string): Promise<SearchPersonResponse> {
    return fetchTMDB<SearchPersonResponse>('/search/person', { query, include_adult: 'false', language: 'en-US' });
}

export async function fetchPersonMovies(personId: number): Promise<PersonMovieCredits> {
    return fetchTMDB<PersonMovieCredits>(`/person/${personId}/movie_credits`, { language: 'en-US' });
}