'use client'

import React from 'react'
import { Movie, TV, Person, MediaType } from '../lib/tmdb'
import RenderItem from './render-item'

type RenderGridsProps = {
  results: Movie[] | TV[] | Person[] | (Movie | TV | Person)[]
  type: MediaType
  lastElementRef: (node: HTMLElement | null) => void
  loading: boolean
}

export default function RenderGrids({
  results,
  type,
  lastElementRef,
  loading,
}: RenderGridsProps) {
  const renderContent = () => {
    return (
      <div className="flex flex-wrap">
        {results.map((result, index) => (
          <React.Fragment key={index}>
            {index === results.length - 1 ? (
              <div
                className="w-1/4 p-0.5 relative"
                ref={index === results.length - 1 ? lastElementRef : null}
              >
                <RenderItem item={result} type={result.media_type} />
              </div>
            ) : (
              <div className="w-1/4 p-0.5 relative">
                <RenderItem item={result} type={result.media_type} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div>
      {renderContent()}
      {loading && <p>Loading more...</p>}
    </div>
  )
}
