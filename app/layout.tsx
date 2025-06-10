import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload images for smooth animation */}
        <link
          rel="preload"
          as="image"
          href="/images/posterize-low.png"
        />
        <link
          rel="preload"
          as="image"
          href="/images/posterize-high.png"
        />
        <link
          rel="preload"
          as="image"
          href="/images/green screen 1.png"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
