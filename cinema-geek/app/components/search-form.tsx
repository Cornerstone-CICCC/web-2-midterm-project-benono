'use client'

import { useFormState } from 'react-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const initialState = {
  message: '',
}

export function SearchForm({ handleSubmit }: { handleSubmit: any }) {
  const [state, formAction] = useFormState(handleSubmit, initialState)

  return (
    <form action={formAction}>
      <Input
        type="text"
        name="query"
        placeholder="Search"
        className="mb-2"
        icon={<Search />}
      />
      <input type="hidden" name="type" value="multi" />
      <Button type="submit">Search</Button>
    </form>
  )
}
