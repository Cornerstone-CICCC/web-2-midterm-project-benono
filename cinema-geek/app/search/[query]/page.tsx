'use client'

import { SearchParams } from '@/app/lib/tmdb/types'
import { useState, useRef, useCallback, useEffect } from 'react'
import RenderGrids from '@/app/components/render-grids'
import { Movie, TV, Person } from '@/app/lib/tmdb'
import { MediaType } from '@/app/lib/tmdb/types'
import { useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import NextLink from 'next/link'

import { searchAction } from '@/app/lib/actions'

export default function Page({
  params,
  searchParams,
}: {
  params: { query: string }
  searchParams: SearchParams
}) {
  const { query } = params
  const { type = MediaType.multi, adult, year } = searchParams

  const router = useRouter()
  const [searchResults, setSearchResults] = useState<{
    results: Movie[] | TV[] | Person[] | (Movie | TV | Person)[]
    totalPages: number
  } | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef<IntersectionObserver | null>(null)

  const loadMore = useCallback(async () => {
    if (!searchResults || !hasMore || loading) return
    setLoading(true)
    try {
      const response = await searchAction(query, page + 1, type)
      if (!response) return
      const newResults = response.results
      const totalPages = response.totalPages
      setSearchResults((prev) => {
        if (!prev) return { results: newResults, totalPages }
        return {
          results: [...prev.results, ...newResults] as
            | Movie[]
            | TV[]
            | Person[],
          totalPages,
        }
      })
      setPage((prev) => prev + 1)
      setHasMore(page + 1 < totalPages)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setLoading(false)
    }
  }, [page, searchResults, query, type, hasMore, loading])

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, loadMore]
  )
  useEffect(() => {
    async function fetchInitialResults() {
      const response = await searchAction(query, 1, type as MediaType, {
        adult: adult,
        year: year,
      })
      if (response) {
        setSearchResults({
          results: response.results,
          totalPages: response.totalPages,
        })
        setHasMore(1 < response.totalPages)
      }
    }
    fetchInitialResults()
  }, [query, type, adult, year])

  return (
    <main>
      <div className="mx-auto py-2 flex justify-center items-center relative">
        <div className="w-20 absolute left-2 flex items-center">
          <NextLink href="/search">
            <ArrowBackIosIcon />
          </NextLink>
          <NextLink href="/search">
            <div className="ml-[-5px] text-sm">Search</div>
          </NextLink>
        </div>

        <h1 className="text-center text-2xl font-bold">{decodeURI(query)}</h1>
      </div>

      <div>
        {searchResults && (
          <RenderGrids
            results={searchResults.results}
            type={type}
            lastElementRef={lastElementRef}
            loading={loading}
          />
        )}
      </div>
    </main>
  )
}
