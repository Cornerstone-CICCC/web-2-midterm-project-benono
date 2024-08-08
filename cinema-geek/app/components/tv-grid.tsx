import React from 'react'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import ExplicitIcon from '@mui/icons-material/Explicit'
import { TV } from '../lib/tmdb/types'
interface TVGridProps {
  tvShows: TV[]
  lastElementRef: (node: HTMLDivElement | null) => void
}

export default function TVGrid({ tvShows, lastElementRef }: TVGridProps) {
  return (
    <div className="flex flex-wrap">
      {tvShows.map((tvShow, index) => (
        <div
          key={`${tvShow.id}-${index}`}
          className="w-1/4 p-0.5 relative"
          ref={index === tvShows.length - 1 ? lastElementRef : null}
        >
          {tvShow.poster_path && (
            <Image
              src={tvShow.poster_path ?? ''}
              alt={tvShow.name}
              width={200}
              height={200}
            />
          )}
          {tvShow.adult && (
            <div className="absolute top-0 left-0 bg-red-500 p-1">
              <ExplicitIcon className="text-white" />
            </div>
          )}
          <div className="flex justify-start items-center bg-gray-50 gap-1 p-1">
            <div className="flex flex-col items-center">
              <StarIcon className="text-accent mr-0.5" />
              <p className="text-sm text-accent">
                {tvShow.vote_average.toFixed(1)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PeopleIcon className="text-gray-500 mr-0.5" />
              <p className="text-sm">{tvShow.vote_count}</p>
            </div>
            <div className="flex flex-col items-center">
              <StarIcon className="text-accent mr-0.5" />
              <p className="text-sm text-accent">
                {tvShow.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
