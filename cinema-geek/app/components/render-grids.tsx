'use client'

import React from 'react'
import { Movie, TV, Person, MediaType } from '../lib/tmdb'
import RenderItem from './render-item'

type RenderGridsProps = {
  results: Movie[] | TV[] | Person[] | (Movie | TV | Person)[]
  lastElementRef: (node: HTMLElement | null) => void
  isMulti?: boolean
  loading: boolean
}

export default function RenderGrids({
  results,
  lastElementRef,
  isMulti = true,
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
                <RenderItem
                  item={result}
                  type={result.media_type}
                  isMulti={isMulti}
                />
              </div>
            ) : (
              <div className="w-1/4 p-0.5 relative">
                <RenderItem
                  item={result}
                  type={result.media_type}
                  isMulti={isMulti}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <>
      {results.length > 0 ? (
        <div>
          {renderContent()}
          {loading && <p>Loading more...</p>}
        </div>
      ) : (
        <div className="mt-10 text-center text-2xl font-bold">No Data</div>
      )}
    </>
  )
}
