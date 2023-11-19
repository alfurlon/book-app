'use client'

import { useState, useEffect } from "react"
import axiosInstance from "../../../lib/axios"
import BookGalleryBook from "../../../components/BookGalleryBook"

// const book = {
//     _id: '',
//     title: '',
//     author: {
//         _id: '',
//         firstName: '',
//         lastName: '',
//         __v: 0
//     },
//     summary: '',
//     coverPhoto: '',
//     slug: '',
//     __v: 0,
//     genre: []
// }

export default function Home() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axiosInstance.get('/books')
            .then(response => setBooks(response.data.result.books))
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