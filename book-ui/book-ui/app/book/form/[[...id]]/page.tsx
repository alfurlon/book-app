'use client'

import Image from "next/image"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import axios from "axios"
import { capitalizeEachWord } from '@/utils/helperMethods'
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axios"

interface BookFormValues {
  title: string
  publishedDate: string
  summary: string
  genre: string
  pages: number
  // coverPhoto: null,
  authorFirstName: string
  authorLastName: string
}

const emptyBookForm: BookFormValues = {
  title: '',
  publishedDate: '',
  summary: '',
  genre: '',
  pages: 0,
  // coverPhoto: null,
  authorFirstName: '',
  authorLastName: ''
}

export default function Home({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth()
  const [errorMessages, setErrorMessages] = useState<string>('')
  const [existingBook, setExistingBook] = useState<BookFormValues>(emptyBookForm)
  const [isEditingBook, setIsEditingBook] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // !! Add the error logic I have in my login/signup page

  useEffect(() => {
    if (params.id) {
        axiosInstance.get(`/books/${params.id}`)
        .then(response => {
          const bookData = response.data.result.book
          
          // !! Should conditionally render the form
          setExistingBook({
            title: bookData.title,
            publishedDate: bookData.publishedDate,
            summary: bookData.summary,
            genre: bookData.genre,
            pages: bookData.pages,
            // coverPhoto: bookData.coverPhoto,
            authorFirstName: bookData.author.firstName,
            authorLastName: bookData.author.lastName
          })
          setIsEditingBook(true)
          setIsLoading(true)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [params.id])

  // const validationSchema = Yup.object({
  //   title: Yup.string().required('Title is required'),
  //   authorFirstName: Yup.string().required('Author First Name is required'),
  //   authorLastName: Yup.string().required('Author Last Name is required')
  // })

  const handleChange = (evt) => {
    const nextBook = {...existingBook}
    nextBook[evt.target.name] = evt.target.value
    setExistingBook(nextBook)
  }

  const handleCoverPhotoChange = (evt) => {
    const nextBook = {...existingBook}
    nextBook[evt.target.name] = evt.currentTarget.files[0]
    setExistingBook(nextBook)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // Capitalize the word
    existingBook.title = capitalizeEachWord(existingBook.title)
    existingBook.authorFirstName = capitalizeEachWord(existingBook.authorFirstName)
    existingBook.authorLastName = capitalizeEachWord(existingBook.authorLastName)
    existingBook.genre = capitalizeEachWord(existingBook.genre)

    const formData = new FormData()
    formData.append('title', existingBook.title)
    formData.append('publishedDate', existingBook.publishedDate)
    formData.append('summary', existingBook.summary)
    formData.append('genre', existingBook.genre)
    formData.append('pages', existingBook.pages.toString())
    // if (values.coverPhoto !== null) {
    //   formData.append('coverPhoto', existingBook.coverPhoto as Blob)
    // }
    formData.append('authorFirstName', existingBook.authorFirstName)
    formData.append('authorLastName', existingBook.authorLastName)

    if (isEditingBook) {
      axios.patch(`http://localhost:3001/api/v1/books/${params.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(data => {
          console.log(data)
          router.push('/book/gallery')
        })
        .catch(error => {
            console.log(error)
            setErrorMessages(error.response.data.message)
        })

    } else {
      axios.post('http://localhost:3001/api/v1/books', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'id': user?.id
          }
        })
        .then(data => {
          console.log(data)
          router.push('/book/gallery')
        })
        .catch(error => {
            console.log(error)
            setErrorMessages(error.response.data.message)
        })
    }
    // console.log('existingBook', JSON.stringify(existingBook, null, 2))
    // console.log('formData', JSON.stringify(formData, null, 2))
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return <>
    <div className="grid grid-cols-1 justify-items-center">
      <h1 className="font-bold text-3xl text-center">{isEditingBook ? 'Update Your Book' : 'Add a Book'}</h1>
      <p className="mb-6 text-slate-400 font-extralight text-center">* indicates required</p>
      {errorMessages && <div><p>{errorMessages}</p></div>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-full bg-slate-50 py-12 px-24 rounded-lg">
          <div className="mr-14">
            <div>
              <label htmlFor="title" className="block font-medium text-md mb-2" >Title*</label>
              <input type="text" name="title" id="title" className="rounded-md mb-4 w-full" value={existingBook.title} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="publishedDate" className="block font-medium text-md mb-2" >Published Date</label>
              <input type="date" name="publishedDate" id="publishedDate" className="rounded-md mb-4" value={existingBook.publishedDate} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="summary" className="block font-medium text-md mb-2" >Summary</label>
              <textarea name="summary" id="summary" className="rounded-md mb-4" value={existingBook.summary} onChange={handleChange} cols={20} rows={2} />
            </div>
            <div>
              <label htmlFor="genre" className="block font-medium text-md mb-2" >Genre</label>
              <select name="genre" id="genre" className="rounded-md mb-4 w-full" value={existingBook.genre} onChange={handleChange}>
                <option value=""></option>
                <option value="adventure">Adventure</option>
                <option value="apocalyptic">Apocalyptic</option>
                <option value="art">Art</option>
                <option value="autobiography">Autobiography</option>
                <option value="biography">Biography</option>
                <option value="business">Business</option>
                <option value="childrens fiction">Childrens Fiction</option>
                <option value="cooking">Cooking</option>
                <option value="education">Education</option>
                <option value="fantasy">Fantasy</option>
                <option value="health">Health</option>
                <option value="history">History</option>
                <option value="historical fiction">Historical Fiction</option>
                <option value="hobby">Hobby</option>
                <option value="horror">Horror</option>
                <option value="humor">Humor</option>
                <option value="law">Law</option>
                <option value="lgbtq">LGBTQ</option>
                <option value="memoir">Memoir</option>
                <option value="mystery">Mystery</option>
                <option value="philosophy">Philosophy</option>
                <option value="photography">Photography</option>
                <option value="politics">Politics</option>
                <option value="relationships">Relationships</option>
                <option value="religion">Religion</option>
                <option value="romance">Romance</option>
                <option value="science fiction">Science Fiction</option>
                <option value="self-help">Self-Help</option>
                <option value="thriller">Thriller</option>
                <option value="travel">Travel</option>
                <option value="true crime">True Crime</option>
                <option value="young adult">Young Adult</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <label htmlFor="pages" className="block font-medium text-md mb-2" >Pages</label>
              <input type="number" name="pages" id="pages" className="rounded-md mb-6 w-full" value={existingBook.pages} onChange={handleChange} />
            </div>
            <div className="mb-6">
                  <label htmlFor="coverPhoto" className="font-medium text-md block">Cover Photo*</label>
                  <p className="mb-2 text-slate-400 font-extralight">Must be a jpg, jpeg, or png file</p>
                  <input
                    className="rounded-md mb-4"
                    type="file"
                    name="coverPhoto"
                    onChange={handleCoverPhotoChange}
                  />
                </div>
            <div>
              <label htmlFor="authorFirstName" className="block font-medium text-md mb-2" >Author First Name*</label>
              <input type="text" name="authorFirstName" id="authorFirstName" className="rounded-md mb-4 w-full" value={existingBook.authorFirstName} onChange={handleChange} required />
            </div>
            <div className="pt-1">
              <label htmlFor="authorLastName" className="block font-medium text-md mb-2" >Author Last Name*</label>
              <input type="text" name="authorLastName" id="authorLastName" className="rounded-md mb-4 w-full" value={existingBook.authorLastName} onChange={handleChange} required />
            </div>
            <button type="submit" className="text-md font-medium text-white w-24 bg-blue-600 h-8 rounded-md text-center self-end" >Submit</button>
          </div>
        </div>
      </form>
    </div>
    
  </>
}
  