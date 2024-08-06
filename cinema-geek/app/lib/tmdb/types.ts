export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
}

export interface Person {
    id: number;
    name: string;
    profile_path: string | null;
}

export interface TrendingMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface SearchPersonResponse {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
}

export interface PersonMovieCredits {
    id: number;
    cast: Movie[];
    crew: {
        id: number;
        department: string;
        job: string;
        credit_id: string;
        adult: boolean;
        gender: number;
        title: string;
        original_title: string;
        overview: string;
        poster_path: string | null;
        release_date: string;
    }[];
}