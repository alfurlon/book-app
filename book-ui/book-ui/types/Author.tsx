export interface Author {
    _id: string;
    firstName: string;
    lastName: string;
    __v?: number;
}

export const emptyAuthor = {
    _id: '',
    firstName: '',
    lastName: ''
}