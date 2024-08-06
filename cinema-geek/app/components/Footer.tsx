'use client'

import Link from 'next/link'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const Footer: React.FC = () => {
    const [selected, setSelected] = useState(0)

    const links = [
        { href: '/', icon: WhatshotIcon, label: 'Trends' },
        { href: '/', icon: SearchIcon, label: 'Search' },
        { href: '/', icon: LightModeIcon, label: 'Light Mode' },
        { href: '/', icon: DarkModeIcon, label: 'Dark Mode' },
        { href: '/settings', icon: SettingsIcon, label: 'Settings' },
    ]

    return (
        <footer className="fixed bottom-0 w-full bg-primary-foreground py-1">
            <div className="grid grid-cols-5">
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
                                selected === index && 'text-red-500',
                            )}
                        />
                        <span className="text-[10px]">{link.label}</span>
                    </Link>
                ))}
            </div>
        </footer>
    )
}