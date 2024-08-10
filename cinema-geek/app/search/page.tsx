'use client'

import { SearchForm } from '@/app/components/search-form'
import { MediaType } from '@/app/lib/tmdb/types'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  async function handleSubmit(prevState: any, formData: FormData) {
    const query = formData.get('query') as string
    const type = formData.get('type') as MediaType
    switch (type) {
      case MediaType.movie:
      case MediaType.tv:
        const adult = formData.get('adult') as string
        const year = formData.get('year') as string
        router.push(
          `/search/${query}?type=${type}&adult=${adult === 'true'}&year=${year}`
        )
        break
      case MediaType.people:
        router.push(`/search/${query}?type=${type}`)
        break
      default:
        router.push(`/search/${query}?type=${type}`)
    }
  }

  return (
    <main>
      <h1 className="py-2 text-center text-2xl font-bold">Search</h1>
      <div className="mx-auto ">
        <SearchForm handleSubmit={handleSubmit} />
      </div>
    </main>
  )
}
