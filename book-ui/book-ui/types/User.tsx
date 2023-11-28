
export interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    role: string,
    active: boolean,
    bookList?: string[],
    haveRead?: Map<string, boolean>,
    yearRead?: Map<string, number>
    __v?: number
}

export const emptyUser = {
    _id: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: 'a',
    role: '',
    active: true,
    bookList: [],
    haveRead: undefined,
    yearRead: undefined
}