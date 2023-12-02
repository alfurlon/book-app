import { Author } from "./Author";

export interface Book {
    _id: string;
    title: string;
    author: Author;
    summary: string;
    coverPhoto: string;
    slug: string;
    genre: string;
    pages: number;
    publishedDate: string;
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
    publishedDate: '',
    slug: '',
    genre: '',
    pages: 0
}