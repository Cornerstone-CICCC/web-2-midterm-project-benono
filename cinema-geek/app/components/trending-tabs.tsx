'use client'

import React, { useState } from 'react'
import MovieGrid from './movie-grid'
import { Movie, TV, Person } from '../lib/tmdb'

type Tab = 'movies' | 'tvShows' | 'people'

interface TrendingTabsProps {
  initialMovies: Movie[]
  initialTVShows: TV[]
  initialPeople: Person[]
}

export default function TrendingTabs({
  initialMovies,
  initialTVShows,
  initialPeople,
}: TrendingTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('movies')
  const [movies, setMovies] = useState(initialMovies)
  const [tvShows, setTVShows] = useState(initialTVShows)
  const [people, setPeople] = useState(initialPeople)

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return <MovieGrid movies={movies} />
      case 'tvShows':
        return (
          <ul>
            {tvShows.map((show) => (
              <li key={show.id}>{show.name}</li>
            ))}
          </ul>
        )
      case 'people':
        return (
          <ul>
            {people.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
        )
    }
  }

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'movies' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('movies')}
        >
          Movies
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tvShows' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('tvShows')}
        >
          TV Shows
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'people' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('people')}
        >
          People
        </button>
      </div>
      {renderContent()}
    </div>
  )
}
