'use client'

import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import { Inter as FontSans } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/sonner'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
// import Image from 'next/image'
import { Progress } from '../components/ui/progress'
// import Loader from '@/src/public/loader.png'
import ScrollToTop from '@/components/ScrollToTop'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Suspense
          fallback={
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
              {/* <Image src={Loader} height={50} width={50} alt=""></Image> */}
              <Progress value={50} className="w-[20%]" />
            </div>
          }
        >
          <Providers>
            {pathname === '/login' ? (
              <>{children}</>
            ) : (
              <>
                <Header />
                {children}
                <Footer />
              </>
            )}
            <Toaster richColors />
            <ScrollToTop />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
