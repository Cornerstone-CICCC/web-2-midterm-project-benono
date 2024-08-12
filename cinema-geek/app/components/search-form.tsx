'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { cn } from '@/lib/utils'

export function SearchForm({
  handleSubmit,
  className,
}: {
  handleSubmit: any
  className?: string
}) {
  const [state, formAction] = useFormState(handleSubmit, null)
  const [searchType, setSearchType] = useState('multi')

  return (
    <form
      action={formAction}
      className={cn('w-[90vw] md:w-[calc(100vw-256px)] mx-auto', className)}
    >
      <div className="flex items-center mb-2">
        <Select onValueChange={setSearchType} defaultValue="multi">
          <SelectTrigger className="w-[80px] md:w-[100px] lg:w-[120px]">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multi">All</SelectItem>
            <SelectItem value="movie">Movies</SelectItem>
            <SelectItem value="tv">TV</SelectItem>

            {/* <SelectItem value="person">People</SelectItem> */}
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="query"
          placeholder="Enter title or name"
          className="ml-2 w-[calc(90vw-180px)] md:w-[400px] lg:w-[600px]"
          icon={<Search />}
        />
        <input type="hidden" name="type" value={searchType} />
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </div>
      {(searchType === 'movie' || searchType === 'tv') && (
        <div className="flex items-center pl-3">
          <div className="flex items-center w-[100px]">
            <label htmlFor="adult" className="mr-2 text-sm">
              Adult
            </label>
            <Input
              type="checkbox"
              id="adult"
              name="adult"
              value="true"
              className="ml-2 h-4"
            />
          </div>
          <Input
            type="number"
            name="year"
            placeholder="Year"
            className="w-[100px]"
          />
        </div>
      )}
      {/* Similar conditions for TV and Person */}
    </form>
  )
}
