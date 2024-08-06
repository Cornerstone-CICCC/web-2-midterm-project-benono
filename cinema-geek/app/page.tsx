import { fetchTrendingMovies, searchPerson, fetchPersonMovies, searchMovie, searchSimilarMovies } from '@/app/lib/tmdb';
import type { Movie, Person } from '@/app/lib/tmdb';  // 型をインポート



export default async function Home() {
  const data = await fetchTrendingMovies()
  const dataByPerson = await searchPerson('Tom Hanks')
  const dataByMovie = await searchMovie('Deadpool 2')
  const dataBySimilarMovie = await searchSimilarMovies(383498)

  //console.log(data)
  //console.log(dataByPerson)
  //console.log(dataByMovie)
  console.log(dataBySimilarMovie)
  return (
    <main >
      Hi I am cinema geek!s
    </main>
  );
}
