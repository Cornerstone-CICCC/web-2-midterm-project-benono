'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import SearchIcon from '@mui/icons-material/Search'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export const SideMenu: React.FC = () => {
  const pathname = usePathname()

  const links = [
    { href: '/', icon: WhatshotIcon, label: 'Trends' },
    { href: '/search', icon: SearchIcon, label: 'Search' },
    //{ href: '/settings', icon: SettingsIcon, label: 'Settings' },
  ]

  return (
    <nav className="hidden md:flex fixed flex-col h-screen md:w-48 lg:w-64 bg-foreground dark:bg-background text-background dark:text-foreground border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Cinema Web</h1>
      </div>
      <ul className="flex-grow">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={cn(
                'flex items-center p-4 hover:bg-accent hover:text-background',
                pathname === link.href && 'bg-accent text-background'
              )}
            >
              <link.icon className="mr-4" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-4">
        <ModeToggle />
      </div>
    </nav>
  )
}
