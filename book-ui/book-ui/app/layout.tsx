import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Virtual Bookshelf',
  description: 'An app to keep track of your books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
    </html>
  )
}