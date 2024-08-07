import React from 'react'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import ExplicitIcon from '@mui/icons-material/Explicit'
import { Movie } from '../lib/tmdb'
interface MovieGridProps {
  movies: Movie[]
  lastElementRef: (node: HTMLDivElement | null) => void
}

export default function MovieGrid({ movies, lastElementRef }: MovieGridProps) {
  return (
    <div className="flex flex-wrap">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="w-1/4 p-0.5 relative"
          ref={index === movies.length - 1 ? lastElementRef : null}
        >
          {movie.poster_path && (
            <Image
              src={movie.poster_path ?? ''}
              alt={movie.title}
              width={200}
              height={200}
            />
          )}
          {movie.adult && (
            <div className="absolute top-0 left-0 bg-red-500 p-1">
              <ExplicitIcon className="text-white" />
            </div>
          )}
          <div className="flex justify-start items-center bg-gray-50 gap-1 p-1">
            <div className="flex flex-col items-center">
              <StarIcon className="text-accent mr-0.5" />
              <p className="text-sm text-accent">
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PeopleIcon className="text-gray-500 mr-0.5" />
              <p className="text-sm">{movie.vote_count}</p>
            </div>
            <div className="flex flex-col items-center">
              <StarIcon className="text-accent mr-0.5" />
              <p className="text-sm text-accent">
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
