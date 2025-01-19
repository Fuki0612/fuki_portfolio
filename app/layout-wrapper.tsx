import RootLayout from './layout'
import { metadata, viewport } from './metadata'

export { metadata, viewport }

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootLayout>{children}</RootLayout>
}

