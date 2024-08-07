'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MovieGrid from './movie-grid'
import { Movie, TV, Person } from '../lib/tmdb'
import { fetchMoreTrending } from '../lib/actions'

type Tab = 'movies' | 'tvShows' | 'people'

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
  const [activeTab, setActiveTab] = useState<Tab>('movies')
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
      const { results, totalPages } = await fetchMoreTrending(
        activeTab,
        page + 1
      )
      switch (activeTab) {
        case 'movies':
          setMovies((prev) => [...prev, ...(results as Movie[])])
          break
        case 'tvShows':
          setTVShows((prev) => [...prev, ...(results as TV[])])
          break
        case 'people':
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
  }, [activeTab, page])

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
  }, [activeTab])

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return <MovieGrid movies={movies} lastElementRef={lastElementRef} />
      case 'tvShows':
        return (
          <ul>
            {tvShows.map((show, index) => (
              <li
                key={show.id}
                ref={index === tvShows.length - 1 ? lastElementRef : null}
              >
                {show.name}
              </li>
            ))}
          </ul>
        )
      case 'people':
        return (
          <ul>
            {people.map((person, index) => (
              <li
                key={person.id}
                ref={index === people.length - 1 ? lastElementRef : null}
              >
                {person.name}
              </li>
            ))}
          </ul>
        )
    }
  }

  return (
    <div>
      <Tabs defaultValue="movies">
        <TabsList>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tvShows">TV Shows</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="movies">{renderContent()}</TabsContent>
      </Tabs>
      {loading && <p>Loading more...</p>}
    </div>
  )
}
