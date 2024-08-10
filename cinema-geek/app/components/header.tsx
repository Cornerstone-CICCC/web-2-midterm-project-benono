'use client'

import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface HeaderProps {
  title: string
  currentPath: string
}

export const Header = ({ title, currentPath }: HeaderProps) => {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  return (
    <header className="flex items-center justify-center relative">
      {from ? (
        <Link href={from} className="absolute left-6">
          <ArrowBackIosIcon />
        </Link>
      ) : (
        <Link href={`/about?from=${currentPath}`} className="absolute left-6">
          <InfoIcon />
        </Link>
      )}

      <h1 className="py-2 text-center text-2xl font-bold">{title}</h1>
    </header>
  )
}
