
export interface User {
    id: string,
    name: string,
    email: string,
    // password: string,
    // passwordConfirm: string,
    // role: string,
    // active: boolean,
    // This string[] may cause a problem with the backend
    bookList?: string[],
    __v?: number
}

export const emptyUser = {
    id: '',
    name: '',
    email: '',
    // password: '',
    // passwordConfirm: 'a',
    // role: '',
    // active: true,
    bookList: [],
}