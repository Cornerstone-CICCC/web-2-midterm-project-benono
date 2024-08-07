import { fetchTrendingMovies, fetchTrendingTV } from '@/app/lib/tmdb'
import TrendingTabs from '@/app/components/trending-tabs'

export default async function Home() {
  const { results: trendingMovies, total_pages: trendingMoviesTotalPages } =
    await fetchTrendingMovies()
  const { results: trendingTV, total_pages: trendingTVTotalPages } =
    await fetchTrendingTV()

  console.log(trendingMovies[0])

  return (
    <main>
      <h1 className="text-2xl font-bold">Trending</h1>
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
  )
}
