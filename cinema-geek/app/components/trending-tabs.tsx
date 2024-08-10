'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Movie, TV, Person, MediaType } from '../lib/tmdb'
import { fetchTrendingAction } from '../lib/actions'
import RenderGrids from './render-grids'

interface TrendingTabsProps {
  initialMovies: Movie[]
  initialTVShows: TV[]
  initialPeople: Person[]
  initialTotalPages: {
    movies: number
    tvShows: number
    people: number
  }
}

export default function TrendingTabs({
  initialMovies,
  initialTVShows,
  initialPeople,
  initialTotalPages,
}: TrendingTabsProps) {
  const [activeTab, setActiveTab] = useState<MediaType>(MediaType.movie)
  const [movies, setMovies] = useState(initialMovies)
  const [tvShows, setTVShows] = useState(initialTVShows)
  const [people, setPeople] = useState(initialPeople)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef<IntersectionObserver | null>(null)

  const loadMore = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetchTrendingAction(activeTab, page + 1)
      if (!response) return
      const results = response.results
      const totalPages = response.totalPages
      switch (activeTab) {
        case MediaType.movie:
          setMovies((prev) => [...prev, ...(results as Movie[])])
          break
        case MediaType.tv:
          setTVShows((prev) => [...prev, ...(results as TV[])])
          break
        case MediaType.people:
          setPeople((prev) => [...prev, ...(results as Person[])])
          break
      }
      setPage((prev) => prev + 1)
      setHasMore(page + 1 < totalPages)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setLoading(false)
    }
  }, [page, activeTab])

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
    setPage(1)
    setHasMore(true)
  }, [])

  const handleTabChange = (value: MediaType) => {
    setActiveTab(value)
  }

  return (
    <div>
      <Tabs
        defaultValue={MediaType.movie}
        onValueChange={(value: string) => handleTabChange(value as MediaType)}
      >
        <TabsList>
          <TabsTrigger value={MediaType.movie}>Movies</TabsTrigger>
          <TabsTrigger value={MediaType.tv}>TV Shows</TabsTrigger>
          <TabsTrigger value={MediaType.people}>People</TabsTrigger>
        </TabsList>

        <TabsContent value={MediaType.movie}>
          <RenderGrids
            results={movies}
            lastElementRef={lastElementRef}
            isMulti={false}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value={MediaType.tv}>
          <RenderGrids
            results={tvShows}
            lastElementRef={lastElementRef}
            isMulti={false}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value={MediaType.people}>
          <RenderGrids
            results={people}
            lastElementRef={lastElementRef}
            isMulti={false}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
