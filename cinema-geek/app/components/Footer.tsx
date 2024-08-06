'use client'

import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SettingsIcon from '@mui/icons-material/Settings'
import { EditCalendar, PieChart } from '@mui/icons-material'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const Footer: React.FC = () => {
    const [selected, setSelected] = useState(0)

    const links = [
        { href: '/', icon: EditCalendar, label: 'Transaction' },
        { href: '/accounts', icon: AccountBalanceIcon, label: 'Account' },
        { href: '/transaction', icon: AddIcon, label: 'Add' },
        { href: '/categories', icon: PieChart, label: 'Analyze' },
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