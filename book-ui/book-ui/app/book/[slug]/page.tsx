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
        <div className="flex md:flex-row xl:w-3/4 lg:w-11/12 w-screen justify-center md:ml-10 flex-col mt-5">
            {/* <div>{JSON.stringify(book, null, 2)}</div> */}
            <div className="lg:mr-24 md:mx-0 mx-auto mb-5">
                {/* Contains photo, published date, and page count */}
                <Image
                    src={bookPhoto}
                    alt={`Cover Photo for ${book.title}`}
                    className="rounded-sm lg:w-800 lg:h-530 md:h-400 md:w-400 h-250 w-200"
                 />
            </div>
            <div className="w-full">
                <div className="md:flex w-full md:justify-between mb-6">
                    <div>
                        {/* Contains book title and book author */}
                        <h1 className="lg:text-4xl lg:mb-4 mb-2 md:font-bold text-center text-2xl font-medium md:text-left lg:ml-0 xl:w-full lg:w-64 md:w-52 md:ml-7 ">{book.title}</h1>
                        <h2 className="lg:text-2xl lg:ml-0 md:ml-7 md:text-left font-medium text-center text-lg lg:mb-0 mb-3">{`By ${book.author.firstName} ${book.author.lastName}`}</h2>
                    </div>
                    <div className="lg:w-32 w-28 bg-blue-600 md:h-12 rounded-md flex justify-center lg:mx-0 mx-auto">
                        {/* contains edit button */}
                        <Link href={`/book/form/${book._id}`} className="lg:text-xl text-white self-center text-center text-lg py-2 md:py-0">Edit Book</Link>
                    </div>
                </div>
                <div className="lg:ml-0 ml-5 md:ml-7">
                    {/* contains summary, and genre */}
                    <p className="lg:mb-6 md:mb-4 mb-2"><span className="font-medium lg:text-xl text-lg">Summary: </span> {book.summary ? book.summary : 'Edit to add'}</p>
                    <h3 className="lg:mb-6 md:mb-4 mb-2"><span className="font-medium lg:text-xl text-lg">Genre: </span>{book.genre ? book.genre : 'Edit to add'}</h3>
                    <h3 className="lg:mt-6 md:mb-4 mb-2"><span className="font-medium lg:text-xl text-lg">Published Date: </span>{book.publishedDate ? book.publishedDate : 'Edit to add'}</h3>
                    <h3 className="lg:mt-6 md:mb-4 mb-2"><span className="font-medium lg:text-xl text-lg">Pages: </span>{(book.pages || book.pages != 0) ? book.pages : 'Edit to add'}</h3>
                </div>
            </div>
        </div>
    )
}