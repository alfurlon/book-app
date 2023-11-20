'use client'

import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axios"
import { Book } from "@/types/Book";

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
    slug: '',
    __v: 0,
    genre: []
}

export default function BookDetail({ params }: { params: { slug: string } }) {

    const [book, setBook] = useState<Book>(emptyBook)

    useEffect(() => {
        axiosInstance.get(`/books/slug/${params.slug}`)
            .then(response => setBook(response.data.result.book))
            .catch(err => console.log(err))
    }, []);


    return (
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author.firstName}</h2>
        </div>
    )
}