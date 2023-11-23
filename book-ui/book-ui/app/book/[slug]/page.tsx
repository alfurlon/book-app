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
            .then(response => setBook(response.data.result.book))
            .catch(err => console.log(err))
    }, []);

    book.summary = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ullam fuga reiciendis nemo, est dolorem, debitis, facere quas laudantium eos fugit similique eum commodi dolorum ut repellat totam rerum. Quod, voluptatum! Obcaecati sint ad sunt modi quos consequatur aliquid corrupti dolorum aperiam distinctio maxime quo voluptatem, itaque ratione veniam inventore saepe, aspernatur perspiciatis magni voluptas asperiores dignissimos consequuntur minima labore. Accusantium ratione, placeat eius earum sint dicta velit nesciunt officia, repudiandae, sunt inventore necessitatibus asperiores porro. Asperiores et excepturi reiciendis in eaque molestias consequuntur ipsam, nihil ut itaque. Necessitatibus aliquid facere alias reprehenderit aut sequi eveniet qui nostrum officia officiis?'
    book.genre = ['Fantasy', 'Horror', 'Comedy']
    book.publishedDate = new Date(1993, 8, 27)

    // Reduce month by one because for some reason they zero indexed months for localedatestring. idiotic
    book.publishedDate.setMonth(book.publishedDate.getMonth() - 1)

    return (
        <div className="flex w-3/4 justify-center ml-20">
            <div className="mr-40">
                {/* Contains photo, published date, and page count */}
                <Image
                    src={bookPhoto}
                    alt={`Cover Photo for ${book.title}`}
                    width={800}
                    height={800}
                    className="rounded-sm"
                 />
                 <h3 className="mt-6 text-xl"><span className="font-medium">Published Date: </span>{book.publishedDate ? book.publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Edit to add'}</h3>
                 <h3 className="mt-6 text-xl"><span className="font-medium">Pages: </span>{book.pages ? book.pages : 'Edit to add'}</h3>
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
                        <Link href='/book/form' className="text-xl text-white self-center">Edit Book</Link>
                    </div>
                </div>
                <div>
                    {/* contains summary, genres, have read, and year read */}
                    <p className="mb-6 text-xl">{book.summary}</p>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Genres: </span>{book.genre.join(', ')}</h3>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Have Read: </span>Add to user and then get from user</h3>
                    <h3 className="mb-6 text-xl"><span className="font-medium">Year Read: </span>Add to user and then get from user</h3>
                </div>
            </div>
        </div>
    )
}