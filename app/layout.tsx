'use client'

import { useEffect } from 'react'
import './globals.css'
import StarBackground from './components/StarBackground'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.orientation === 90 || window.orientation === -90) {
        alert('このサイトは縦向きでの閲覧を推奨しています。デバイスを縦向きにしてください。');
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <StarBackground />
        {children}
      </body>
    </html>
  )
}

