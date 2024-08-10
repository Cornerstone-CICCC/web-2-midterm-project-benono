import React from 'react'
import Link from 'next/link'

import { Header } from '@/app/components/header'

export default function Page() {
  return (
    <>
      <Header title="About" currentPath="/about" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Movie Geek</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is Movie Geek?</h2>
          <p className="mb-4">
            Movie Geek is your ultimate companion for exploring the world of
            Entertainment. Our app provides a comprehensive database of movies,
            television series, and the people behind them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside">
            <li>
              Browse trending movies, TV shows, and people in the entertainment
              industry
            </li>
            <li>Search for specific titles, actors, or crew members</li>
            <li>Get detailed information about movies, TV shows, and people</li>
            <li>User-friendly interface with dark mode support</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <p className="mb-4">
            Simply navigate through the app using the bottom navigation bar. You
            can explore trending content, use the search function to find
            specific items, or adjust settings to customize your experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Source</h2>
          <p className="mb-4">
            Movie Geek uses data from The Movie Database (TMDb). We are grateful
            for their comprehensive API that allows us to bring you up-to-date
            information about the entertainment world.
          </p>
        </section>

        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </main>
    </>
  )
}
