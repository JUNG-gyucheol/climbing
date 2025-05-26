import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Layout from '@/components/layout'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'The Climb',
  description: 'A glitchy climbing experience',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const heavier = localFont({
  src: [
    {
      path: '../../public/fonts/Heavier.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-heavier',
})

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.otf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-ExtraBold.otf',
      weight: '800',
      style: 'extrabold',
    },
    {
      path: '../../public/fonts/Pretendard-Black.otf',
      weight: '900',
      style: 'black',
    },
  ],
  variable: '--font-pretandard',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${heavier.variable} ${pretendard.variable} pb-[20px] antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
