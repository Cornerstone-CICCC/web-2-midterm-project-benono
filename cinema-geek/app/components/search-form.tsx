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
    <form action={formAction} className="w-[90vw] mx-auto">
      <div className="flex items-center">
        <Input
          type="text"
          name="query"
          placeholder="Enter title or name"
          className="mb-2 w-[calc(90vw-100px)]"
          icon={<Search />}
        />
        <input type="hidden" name="type" value="multi" />
        <Button type="submit">Search</Button>
      </div>
      <div className="flex items-center"></div>
    </form>
  )
}
