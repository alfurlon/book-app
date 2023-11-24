import { Author } from "./Author";

export interface Book {
    _id: string;
    title: string;
    author: Author;
    summary?: string;
    coverPhoto: string;
    slug: string;
    __v?: number;
    genre?: string;
    pages?: number;
    publishedDate?: Date;
}

export const emptyBook = {
    _id: '',
    title: '',
    author: {
        _id: '',
        firstName: '',
        lastName: ''
    },
    summary: '',
    coverPhoto: '',
    publishedDate: new Date(1993, 8, 27),
    slug: '',
    genre: '',
    pages: 0
}