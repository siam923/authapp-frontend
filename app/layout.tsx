import Header from '@/components/Header'
import React from 'react';
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'Simple auth app with Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <Header />
        <main className="flex-grow w-full max-w-3xl p-4 sm:p-8">
          {children}
        </main>
        <footer className="p-4 text-center text-gray-600">
          {/* Footer content */}
        </footer>
      </body>
      </html>
  )
}
