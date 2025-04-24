import type { Metadata } from 'next'
import './globals.css'
import StarBackground from './components/StarBackground'

export const metadata: Metadata = {
  title: 'Fuki.N.Port',
  description: 'Fuki Nakamuraのポートフォリオサイトです',
  keywords: 'Fuki Nakamura, 中村風稀',
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    url: "https://fuki-portfolio.vercel.app/",
    siteName: "Fuki.N.Port",
    images: [{ url: "/twitterCard.png" }], 
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuki.N.Port",
    description: "Fuki Nakamuraのポートフォリオサイトです",
    images: ["/twitterCard.png"], 
  },
  icons: {
    icon: [
      { url: '/favicon_ico.ico' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="h-screen overscroll-y-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <StarBackground />
        {children}
      </body>
    </html>
  )
}

