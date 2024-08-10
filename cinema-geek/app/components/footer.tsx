'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export const Footer: React.FC = () => {
  const pathname = usePathname()

  const links = [
    { href: '/', icon: WhatshotIcon, label: 'Trends' },
    { href: '/search', icon: SearchIcon, label: 'Search' },
    { href: '/settings', icon: SettingsIcon, label: 'Settings' },
  ]

  return (
    <footer className="md:hidden fixed bottom-0 w-full bg-[#1C1C1C] text-[#E1E1E1] pt-2 pb-4">
      <div className="grid grid-cols-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex flex-col items-center"
          >
            <link.icon
              className={cn(
                'text-[#E1E1E1]',
                link.href === '/'
                  ? pathname === link.href && 'text-primary'
                  : pathname.includes(link.href) && 'text-primary'
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
