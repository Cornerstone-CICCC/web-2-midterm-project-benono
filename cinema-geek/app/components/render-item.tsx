import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import TheatersIcon from '@mui/icons-material/Theaters'
import TvIcon from '@mui/icons-material/Tv'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

import { Movie, TV, Person, MediaType } from '@/app/lib/tmdb'
import { getImageUrl } from '@/app/lib/tmdb/utils'

interface RenderItemProps {
  item: Movie | TV | Person
  type: MediaType
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

const renderRating = (vote_average: number, vote_count: number) => (
  <div className="flex justify-start items-center bg-gray-50 gap-1 p-1">
    <div className="flex flex-col items-center">
      <StarIcon className="text-accent mr-0.5" />
      <p className="text-sm text-accent">{vote_average.toFixed(1)}</p>
    </div>
    <div className="flex flex-col items-center">
      <PeopleIcon className="text-gray-500 mr-0.5" />
      <p className="text-sm">{vote_count}</p>
    </div>
  </div>
)

export default function RenderItem({ item, type }: RenderItemProps) {
  switch (type) {
    case MediaType.movie:
      const movie = item as Movie
      return (
        <>
          {renderImage(movie.poster_path, movie.title)}
          <div className="absolute top-0.5 right-0.5 bg-secondary p-1">
            <TheatersIcon className="text-white" />
          </div>
          {renderRating(movie.vote_average, movie.vote_count)}
        </>
      )
    case MediaType.tv:
      const tv = item as TV
      return (
        <>
          {renderImage(tv.poster_path, tv.name)}
          <div className="absolute top-0.5 right-0.5 bg-secondary p-1">
            <TvIcon className="text-white" />
          </div>
          {renderRating(tv.vote_average, tv.vote_count)}
        </>
      )
    case MediaType.people:
      return null
  }
}
