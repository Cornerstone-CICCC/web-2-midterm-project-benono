import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { SideMenu } from '@/app/components/side-menu'
import { Footer } from '@/app/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cinema Web',
  description:
    'Cinema Web is a website that allows you to search for movies and TV shows.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <SideMenu />
            <div className="flex flex-grow flex-col md:ml-48 lg:ml-64">
              <main className="flex-grow-4 mb-16 md:mb-0">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
