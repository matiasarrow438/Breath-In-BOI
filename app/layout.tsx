import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Breathe in Boi',
  description: 'breath in boi - The most legendary memecoin inspired by Spongebob Squarepants. Join the community and ride the wave!',
  keywords: 'memecoin, cryptocurrency, spongebob, breath in boi, BREATHINBOI, crypto, meme',
  authors: [{ name: 'BREATHINBOI Team' }],
  openGraph: {
    title: 'Breathe in Boi',
    description: 'breath in boi - The most legendary memecoin inspired by Spongebob Squarepants',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breathe in Boi',
    description: 'breath in boi - The most legendary memecoin inspired by Spongebob Squarepants',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=1" type="image/gif" />
        <link rel="shortcut icon" href="/favicon.ico?v=1" type="image/gif" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-black min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
