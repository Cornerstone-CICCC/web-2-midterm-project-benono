'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { SearchForm } from '@/app/components/search-form'
import RenderGrids from '@/app/components/render-grids'
import { Movie, TV, Person } from '@/app/lib/tmdb'
import { MediaType } from '@/app/lib/tmdb/types'
import { useRouter } from 'next/navigation'

import { searchAction } from '@/app/lib/actions'

export default function Page() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [type, setType] = useState(MediaType.multi)
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

  async function handleSubmit(prevState: any, formData: FormData) {
    const query = formData.get('query') as string
    setQuery(query)
    const type = formData.get('type') as MediaType
    setType(type)
    setPage(1)
    setHasMore(true)
    const response = await searchAction(query, 1, type)
    if (!response) return
    const results = response.results
    const totalPages = response.totalPages
    setSearchResults({ results, totalPages })
    setHasMore(1 < totalPages)
  }

  return (
    <main>
      <h1 className="py-2 text-center text-2xl font-bold">Search</h1>
      <div className="w-[90%] mx-auto">
        <SearchForm handleSubmit={handleSubmit} />
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
