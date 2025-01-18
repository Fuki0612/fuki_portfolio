import type { Metadata } from 'next'
import './globals.css'
import StarBackground from './components/StarBackground'

export const metadata: Metadata = {
  title: 'Fuki Nakamura Portfolio',
  description: 'Personal portfolio of Fuki Nakamura',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <StarBackground />
        {children}
      </body>
    </html>
  )
}

