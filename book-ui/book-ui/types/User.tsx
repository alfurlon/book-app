
export interface User {
    id: string,
    name: string,
    email: string,
    // password: string,
    // passwordConfirm: string,
    // role: string,
    // active: boolean,
    // !! This string[] may cause a problem with the backend
    bookList?: string[],
    haveRead?: Map<string, boolean>,
    yearRead?: Map<string, number>
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
    haveRead: undefined,
    yearRead: undefined
}