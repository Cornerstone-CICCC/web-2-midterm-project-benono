import { fetchTrendingMovies, fetchTrendingTV } from '@/app/lib/tmdb'
import TrendingTabs from '@/app/components/trending-tabs'

export default async function Home() {
  const { results: trendingMovies } = await fetchTrendingMovies()
  const { results: trendingTV } = await fetchTrendingTV()

  console.log(trendingMovies[0])
  //console.log(trendingTV)
  return (
    <main>
      <h1 className="text-2xl font-bold">Trending</h1>
      <TrendingTabs
        initialMovies={trendingMovies}
        initialTVShows={trendingTV}
        initialPeople={[]}
      />
    </main>
  )
}
