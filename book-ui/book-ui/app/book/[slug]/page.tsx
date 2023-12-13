'use client'

import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axios"
import { Book, emptyBook } from "@/types/Book";
import Image from "next/image";
import bookPhoto from "../../../public/imgs/sample-cover-photo.jpg"
import Link from "next/link";

export default function BookDetail({ params }: { params: { slug: string } }) {

    const [book, setBook] = useState<Book>(emptyBook)

    useEffect(() => {
        axiosInstance.get(`/books/slug/${params.slug}`)
            .then(response => {
                setBook(response.data.result.book)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="flex w-3/4 justify-center ml-20">
            {/* <div>{JSON.stringify(book, null, 2)}</div> */}
            <div className="mr-40">
                {/* Contains photo, published date, and page count */}
                <Image
                    src={bookPhoto}
                    alt={`Cover Photo for ${book.title}`}
                    width={800}
                    height={800}
                    className="rounded-sm"
                 />
            </div>
            <div className="w-full">
                <div className="flex w-full justify-between mb-6">
                    <div>
                        {/* Contains book title and book author */}
                        <h1 className="text-4xl mb-2 font-bold">{book.title}</h1>
                        <h2 className="text-2xl font-medium">{`By ${book.author.firstName} ${book.author.lastName}`}</h2>
                    </div>
                    <div className="w-40 bg-blue-600 h-12 rounded-md flex justify-center">
                        {/* contains edit button */}
                        <Link href={`/book/form/${book._id}`} className="text-xl text-white self-center text-center">Edit Book</Link>
                    </div>
                </div>
                <div>
                    {/* contains summary, and genre */}
                    <p className="mb-6 text-xl"><span className="font-medium">Summary: </span> {book.summary ? book.summary : 'Edit to add'}</p>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Genre: </span>{book.genre ? book.genre : 'Edit to add'}</h3>
                    <h3 className="mt-6 text-xl"><span className="font-medium">Published Date: </span>{book.publishedDate ? book.publishedDate : 'Edit to add'}</h3>
                    <h3 className="mt-6 text-xl"><span className="font-medium">Pages: </span>{(book.pages || book.pages != 0) ? book.pages : 'Edit to add'}</h3>
                </div>
            </div>
        </div>
    )
}