import { fetchTrendingMovies, fetchTrendingTV } from '@/app/lib/tmdb'
import TrendingTabs from '@/app/components/trending-tabs'
import { Header } from '@/app/components/header'

export default async function Home() {
  const { results: trendingMovies, total_pages: trendingMoviesTotalPages } =
    await fetchTrendingMovies()
  const { results: trendingTV, total_pages: trendingTVTotalPages } =
    await fetchTrendingTV()

  return (
    <>
      <Header title="Trend" currentPath="/" />
      <main>
        <TrendingTabs
          initialMovies={trendingMovies}
          initialTVShows={trendingTV}
          initialPeople={[]}
          initialTotalPages={{
            movies: trendingMoviesTotalPages,
            tvShows: trendingTVTotalPages,
            people: 0,
          }}
        />
      </main>
    </>
  )
}
