import Image from "next/image"
import bookPhoto from "../public/imgs/sample-cover-photo.jpg"
// import '../app/globals.css'
import Link from "next/link";
import { Book } from "@/types/Book";

interface BookProps {
    book: Book;
    children?: React.ReactNode;
}

export default function BookGalleryBook({ book }: BookProps) {

    return (
        <Link
            href={`/book/${book.slug}`}
            className="lg:mb-10 flex flex-col mb-5"
        >
            <Image
                src={book.coverPhoto ? book.coverPhoto : bookPhoto}
                width={300}
                height={300}
                alt={`Cover photo for ${book.title}`}
                className="rounded-md lg:mb-4 mb-2"
            />
            <h2 className="lg:text-xl text-center lg:mb-2 mb-1 font-medium">{book.title}</h2>
            <p className="text-center">By {book.author.firstName} {book.author.lastName}</p>
        </Link>
    )
}