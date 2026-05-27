import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Zworth Reading | Max\'s EM Weekly Update',
  description: 'What\'s worth reading in Emergency Medicine, this week. A weekly curated digest of the most important EM literature, critically appraised and delivered every Sunday.',
  openGraph: {
    title: 'Zworth Reading | Max\'s EM Weekly Update',
    description: 'What\'s worth reading in Emergency Medicine, this week.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#FAFAFA]`}>
        {/* Red top banner */}
        <div className="h-1 bg-[#C0392B] w-full flex-shrink-0" aria-hidden="true" />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
