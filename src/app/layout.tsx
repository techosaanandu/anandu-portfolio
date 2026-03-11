import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creative Developer | Portfolio',
  description: 'A high-end, immersive 3D portfolio for a Full-Stack Developer leveraging Next.js, Three.js, and Framer Motion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030303] text-gray-100 antialiased`}>
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
