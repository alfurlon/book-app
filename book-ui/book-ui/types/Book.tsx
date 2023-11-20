import { Author } from "./Author";

export interface Book {
    _id: string;
    title: string;
    author: Author;
    summary: string;
    coverPhoto: string;
    slug: string;
    __v: number
    genre: string[]
}