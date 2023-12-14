import Image from "next/image"
import bookPhoto from "../public/imgs/sample-cover-photo.jpg"
// import '../app/globals.css'
import Link from "next/link";
import { Book } from "@/types/Book";

interface BookProps {
    book: Book;
    // I don't know if I need this?
    children?: React.ReactNode;
}

export default function BookGalleryBook({ book }: BookProps) {

    return (
        <Link
            href={`/book/${book.slug}`}
            className="mb-10 flex flex-col"
        >
            <Image
                src={book.coverPhoto ? book.coverPhoto : bookPhoto}
                width={300}
                height={300}
                alt={`Cover photo for ${book.title}`}
                className="rounded-md mb-4"
            />
            <h2 className="text-xl text-center mb-2">{book.title}</h2>
            <p className="text-center">By {book.author.firstName} {book.author.lastName}</p>
        </Link>
    )
}