'use client'

import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface HeaderProps {
  title: string
  currentPath: string
  fromPath?: string
  fromTitle?: string
}

export const Header = ({
  title,
  currentPath,
  fromPath,
  fromTitle,
}: HeaderProps) => {
  const searchParams = useSearchParams()
  let from = fromPath
  if (!from) {
    from = searchParams.get('from') ?? undefined
  }

  return (
    <div className="flex items-center justify-center relative">
      {from ? (
        <Link href={from} className="absolute left-6">
          <ArrowBackIosIcon />
          {fromTitle && <span className="text-sm">{fromTitle}</span>}
        </Link>
      ) : (
        <Link href={`/about?from=${currentPath}`} className="absolute left-6">
          <InfoIcon />
        </Link>
      )}

      <h1 className="py-2 text-center text-2xl font-bold min-h-12">{title}</h1>
    </div>
  )
}
