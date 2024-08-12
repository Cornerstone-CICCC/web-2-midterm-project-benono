import Image from 'next/image'
import { fetchMovieById } from '@/app/lib/tmdb/api'
import { getImageUrl } from '@/app/lib/tmdb/utils'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import { getMainCast, getDirectorAndWriter } from '@/app/lib/tmdb/types'
import { Header } from '@/app/components/header'

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { fromPath: string; fromTitle: string }
}) {
  const movie = await fetchMovieById(params.id)
  const mainCast = getMainCast(movie.credits)
  const directorAndWriter = getDirectorAndWriter(movie.credits)
  console.log(directorAndWriter)

  return (
    <>
      <Header
        title=""
        currentPath={`/movie/${params.id}`}
        fromPath={searchParams.fromPath}
        fromTitle={searchParams.fromTitle}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8 mb-8 md:mb-0">
          {/* Poster */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Image
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              width={500}
              height={750}
              className="shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center mb-4">
              <StarIcon className="text-yellow-400 mr-1" />
              <span className="font-bold mr-4">
                {movie.vote_average.toFixed(1)}
              </span>
              <PeopleIcon className="text-gray-500 mr-1" />
              <span>{movie.vote_count} votes</span>
            </div>

            <p className="text-gray-600 mb-4">
              {movie.release_date} • {movie.runtime} min
            </p>

            <div className="mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-primary-foreground mr-2 mb-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-foreground mb-6">{movie.overview}</p>

            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
              {mainCast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <Image
                    src={getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    width={100}
                    height={100}
                    className="rounded-md mx-auto mb-2"
                  />
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-600">{actor.character}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Director and Writer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {directorAndWriter.map((crewMember) => (
                <div key={crewMember.id} className="text-center">
                  <p className="font-semibold">{crewMember.name}</p>
                  <p className="text-sm text-gray-600">{crewMember.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
