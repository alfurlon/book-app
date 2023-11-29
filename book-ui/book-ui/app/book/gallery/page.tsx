'use client'

import { useState, useEffect } from "react"
import axiosInstance from "../../../lib/axios"
import BookGalleryBook from "../../../components/BookGalleryBook"
import { Book } from "@/types/Book"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const { user } = useAuth()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    // Get book list from users own booklist
    // Right now going to hard code 6552c60d60a3eb7c0c10e2b6
    // in the future user the actual logged in user id
    axiosInstance.get('/books/user/6552c60d60a3eb7c0c10e2b6')
        .then(response => {
          setBooks(response.data.data.filledBookList)
        })
        .catch(err => console.log(err))
  }, []);

  return (
    <main className="h-screen bg-none">
      <h1>Gallery</h1>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
          {/* Need a books gallery page to load a map of books. And then also an individual book page */}
          {books.map(book => {
            return <BookGalleryBook key={book._id} book={book} />
          })}
      </div>
    </main>
  )
  }