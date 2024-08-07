'use client'

import Link from 'next/link'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export const Footer: React.FC = () => {
  const [selected, setSelected] = useState(0)

  const links = [
    { href: '/', icon: WhatshotIcon, label: 'Trends' },
    { href: '/', icon: SearchIcon, label: 'Search' },
    { href: '/', icon: SettingsIcon, label: 'Settings' },
  ]

  return (
    <footer className="fixed bottom-0 w-full bg-primary-foreground py-1">
      <div className="grid grid-cols-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex flex-col items-center"
            onClick={() => setSelected(index)}
          >
            <link.icon
              className={cn(
                'text-stone-500',
                selected === index && 'text-red-500'
              )}
            />
            <span className="text-[10px]">{link.label}</span>
          </Link>
        ))}
        <div className="flex flex-col justify-center items-center">
          <ModeToggle />
          <span className="text-[10px]">Mode</span>
        </div>
      </div>
    </footer>
  )
}
