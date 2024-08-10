'use client'

import { SearchForm } from '@/app/components/search-form'
import { MediaType } from '@/app/lib/tmdb/types'
import { useRouter } from 'next/navigation'
import { Header } from '@/app/components/header'

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
    <>
      <Header title="Search" currentPath="/search" />
      <main>
        <div className="mx-auto ">
          <SearchForm handleSubmit={handleSubmit} />
        </div>
      </main>
    </>
  )
}
