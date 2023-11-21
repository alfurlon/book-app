'use client'

import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axios"
import { Book } from "@/types/Book";
import Image from "next/image";
import bookPhoto from "../../../public/imgs/sample-cover-photo.jpg"

const emptyBook = {
    _id: '',
    title: '',
    author: {
        _id: '',
        firstName: '',
        lastName: '',
        __v: 0
    },
    summary: '',
    coverPhoto: '',
    // publishedDate
    slug: '',
    __v: 0,
    genre: [],
    pages: 0
}

export default function BookDetail({ params }: { params: { slug: string } }) {

    const [book, setBook] = useState<Book>(emptyBook)

    useEffect(() => {
        axiosInstance.get(`/books/slug/${params.slug}`)
            .then(response => setBook(response.data.result.book))
            .catch(err => console.log(err))
    }, []);

    book.summary = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ullam fuga reiciendis nemo, est dolorem, debitis, facere quas laudantium eos fugit similique eum commodi dolorum ut repellat totam rerum. Quod, voluptatum! Obcaecati sint ad sunt modi quos consequatur aliquid corrupti dolorum aperiam distinctio maxime quo voluptatem, itaque ratione veniam inventore saepe, aspernatur perspiciatis magni voluptas asperiores dignissimos consequuntur minima labore. Accusantium ratione, placeat eius earum sint dicta velit nesciunt officia, repudiandae, sunt inventore necessitatibus asperiores porro. Asperiores et excepturi reiciendis in eaque molestias consequuntur ipsam, nihil ut itaque. Necessitatibus aliquid facere alias reprehenderit aut sequi eveniet qui nostrum officia officiis?'
    book.genre = ['Fantasy', 'Horror', 'Comedy']

    return (
        <div className="flex w-3/4 justify-center ml-20">
            <div className="mr-40">
                {/* Contains photo, published date, and page count */}
                <Image
                    src={bookPhoto}
                    alt={`Cover Photo for ${book.title}`}
                    width={800}
                    height={800}
                 />
                 <h3 className="mt-6 text-xl"><span className="font-medium">Published Date: </span>August 27, 1993</h3>
                 <h3 className="mt-6 text-xl"><span className="font-medium">Pages: </span>{book.pages ? book.pages : 'Edit to add'}</h3>
            </div>
            <div className="w-full">
                <div className="flex w-full justify-between mb-6">
                    <div>
                        {/* Contains book title and book author */}
                        <h1 className="text-4xl mb-2 font-bold">{book.title}</h1>
                        <h2 className="text-2xl font-medium">{`By ${book.author.firstName} ${book.author.lastName}`}</h2>
                    </div>
                    <div>
                        {/* contains edit button */}
                        <button className="text-xl w-40 bg-blue-600 h-12 text-white rounded-md">Edit Book</button>
                    </div>
                </div>
                <div>
                    {/* contains summary, genres, have read, and year read */}
                    <p className="mb-6 text-xl">{book.summary}</p>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Genres: </span>{book.genre.join(', ')}</h3>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Have Read: </span>Yes</h3>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Year Read: </span>2022</h3>
                </div>
            </div>
        </div>
    )
}