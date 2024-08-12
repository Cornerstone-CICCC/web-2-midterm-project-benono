import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import TheatersIcon from '@mui/icons-material/Theaters'
import TvIcon from '@mui/icons-material/Tv'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import Link from 'next/link'

import { Movie, TV, Person, MediaType } from '@/app/lib/tmdb'
import { MovieGenres, TVGenres } from '@/app/lib/tmdb/data'
import { getImageUrl } from '@/app/lib/tmdb/utils'

interface RenderItemProps {
  item: Movie | TV | Person
  type: MediaType
  isMulti?: boolean
  currentPath: string
  currentTitle: string
}

const renderImage = (path: string | null, alt: string) => (
  <div className="w-full aspect-[2/3] relative">
    {path ? (
      <Image
        src={getImageUrl(path, 'w500')}
        alt={alt}
        fill
        className="object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gray-500 flex justify-center items-center">
        <ImageNotSupportedIcon className="text-white text-4xl" />
      </div>
    )}
  </div>
)

const renderRating = (
  vote_average: number,
  vote_count: number,
  title: string
) => (
  <>
    <div className="flex justify-center md: items-start bg-gray-50 dark:bg-gray-700  gap-3 p-1">
      <div className="hidden md:flex items-center truncate text-sm md:min-h-12 md:w-24">
        {title}
      </div>
      <div className="flex flex-col items-center">
        <StarIcon className="text-yellow-400 mr-0.5" />
        <p className="text-sm ">{vote_average.toFixed(1)}</p>
      </div>
      <div className="flex flex-col items-center">
        <PeopleIcon className="text-gray-500 dark:text-gray-300 mr-0.5" />
        <p className="text-sm">{vote_count}</p>
      </div>
    </div>
  </>
)
export default function RenderItem({
  item,
  type,
  isMulti = true,
  currentPath,
  currentTitle,
}: RenderItemProps) {
  const renderContent = () => {
    switch (type) {
      case MediaType.movie:
        const movie = item as Movie
        return (
          <>
            <Link
              href={`/movie/${movie.id}?fromPath=${currentPath}&fromTitle=${currentTitle}`}
            >
              {renderImage(movie.poster_path, movie.title)}

              {isMulti && (
                <div className="absolute top-0.5 right-0.5 bg-secondary p-1">
                  <TheatersIcon className="text-white" />
                </div>
              )}
              {renderRating(movie.vote_average, movie.vote_count, movie.title)}
            </Link>
          </>
        )
      case MediaType.tv:
        const tv = item as TV
        return (
          <>
            <Link
              href={`/tv/${tv.id}?fromPath=${currentPath}&fromTitle=${currentTitle}`}
            >
              {renderImage(tv.poster_path, tv.name)}

              {isMulti && (
                <div className="absolute top-0.5 right-0.5 bg-secondary p-1">
                  <TvIcon className="text-white" />
                </div>
              )}
              {renderRating(tv.vote_average, tv.vote_count, tv.name)}
            </Link>
          </>
        )
      case MediaType.people:
        return null
    }
  }

  return renderContent()
}
