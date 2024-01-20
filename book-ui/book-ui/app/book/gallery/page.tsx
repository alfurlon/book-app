'use client'

import { useState, useEffect } from "react"
import BookGalleryBook from "../../../components/BookGalleryBook"
import { Book } from "@/types/Book"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"

export default function Home() {
  const { user } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get book list from users own booklist
    // Right now going to hard code 6552c60d60a3eb7c0c10e2b6
    if (user?.id) {
      axios.get(`http://localhost:3001/api/v1/books/user/${user?.id}`)
      .then(response => {
        setBooks(response.data.data.filledBookList)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
    }
  }, [user?.id]);

  if (isLoading) {
    // !! Create a loading animation
    return <p>Loading...</p>
  }

  return (
    <main className="h-screen bg-none">
      <h1 className="lg:text-3xl text-center lg:mb-5 lg:font-bold text-base font-medium mb-3 mt-5">Your Gallery</h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 lg:mx-0 justify-items-center mx-4">
          {/* Need a books gallery page to load a map of books. And then also an individual book page */}
          {books.map(book => {
            return <BookGalleryBook key={book._id} book={book} />
          })}
      </div>
    </main>
  )
  }