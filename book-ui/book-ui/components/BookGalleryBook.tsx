import Image from "next/image"
import bookPhoto from "../public/imgs/sample-cover-photo.jpg"
// import '../app/globals.css'
import Link from "next/link";

interface Author {
    _id: string;
    firstName: string;
    lastName: string;
    __v: number;
}

interface Book {
    _id: string;
    title: string;
    author: Author;
    summary: string;
    coverPhoto: string;
    slug: string;
    __v: number
    genre: string[]
}

interface BookProps {
    book: Book;
    // I don't know if I need this?
    children?: React.ReactNode;
}

export default function BookGalleryBook({ book }: BookProps) {

    return (
        <div
            className="mb-10 flex flex-col"
        >
            <Image
                src={bookPhoto}
                width={300}
                height={300}
                alt={`Cover photo for ${book.title}`}
                className="rounded-md mb-4"
            />
            <h2 className="text-xl text-center mb-2">{book.title}</h2>
            <p className="text-center">By {book.author.firstName} {book.author.lastName}</p>
        </div>
    )
}