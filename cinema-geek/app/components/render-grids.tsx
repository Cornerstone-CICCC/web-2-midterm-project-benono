'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

import { Movie, TV, Person } from '../lib/tmdb'
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
  const currentPath = usePathname()

  let currentTitle = ''
  switch (currentPath) {
    case '/':
      currentTitle = 'Trend'
      break
    case '/search':
      currentTitle = 'Search'
      break
    default:
      if (currentPath.includes('/search/')) {
        currentTitle = 'Search'
      } else {
        currentTitle = 'Trend'
      }
  }
  const renderContent = () => {
    return (
      <div className="flex flex-wrap">
        {results.map((result, index) => (
          <React.Fragment key={index}>
            {index === results.length - 1 ? (
              <div
                className="w-1/4 max-w-[200px] p-0.5 relative"
                ref={index === results.length - 1 ? lastElementRef : null}
              >
                <RenderItem
                  item={result}
                  type={result.media_type}
                  isMulti={isMulti}
                  currentPath={currentPath}
                  currentTitle={currentTitle}
                />
              </div>
            ) : (
              <div className="w-1/4 max-w-[200px] p-0.5 relative">
                <RenderItem
                  item={result}
                  type={result.media_type}
                  isMulti={isMulti}
                  currentPath={currentPath}
                  currentTitle={currentTitle}
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
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <div className="text-2xl font-bold">Sorry, there is no data!</div>
          <div className="w-[90vw] md:w-[800px] md:h-[500px]">
            <Image
              src="/no-data.png"
              alt="No Data"
              className="w-full h-full object-cove"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      )}
    </>
  )
}
