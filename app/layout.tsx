import type { Metadata } from 'next'
import './globals.css'
import StarBackground from './components/StarBackground'

export const metadata: Metadata = {
  title: 'Fuki Nakamura Portfolio',
  description: 'Personal portfolio of Fuki Nakamura',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon_ico.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="shortcut icon" href="/favicon_ico.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <StarBackground />
        {children}
      </body>
    </html>
  )
}

