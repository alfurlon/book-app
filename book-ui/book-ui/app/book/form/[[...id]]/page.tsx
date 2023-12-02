'use client'

import bookPhoto from "@/public/imgs/bookshelf-bg.jpg"
import Image from "next/image"
import { useFormik, Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import axios from "axios"
import { capitalizeEachWord } from '@/utils/helperMethods'
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axios"
import { Book, emptyBook } from "@/types/Book"

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
            
          // !! I should only include fields I am allowing people to edit
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
    //   formData.append('yearRead', existingBook.yearRead.toString())
    // if (values.coverPhoto !== null) {
    //   formData.append('coverPhoto', existingBook.coverPhoto as Blob)
    // }
    formData.append('authorFirstName', existingBook.authorFirstName)
    formData.append('authorLastName', existingBook.authorLastName)
    //   formData.append('haveRead', existingBook.haveRead.toString())

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
    <h1>{isEditingBook ? 'Update Book' : 'Add Book'}</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={existingBook.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="authorFirstName">Author First Name</label>
        <input type="text" name="authorFirstName" id="authorFirstName" value={existingBook.authorFirstName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="authorLastName">Author Last Name</label>
        <input type="text" name="authorLastName" id="authorLastName" value={existingBook.authorLastName} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  </>

  // return (
  //   <div className="h-screen bg-none flex justify-between">
  //     <div className="ml-40">
  //       {/* For the title of the page and the form */}
  //       <h1 className="text-3xl font-bold">Add a Book</h1>
  //       <p className="mb-6 text-slate-400 font-extralight">* indicates required</p>
  //       {errorMessages && <div><p>{errorMessages}</p></div>}
  //       <form onSubmit={formik.handleSubmit} className="mb-20" encType="multipart/form-data">
  //         <div className="mb-4">
  //           <label htmlFor="bookTitle" className="font-medium text-md block mb-2">Book Title*</label>
  //           {formik.touched.title && formik.errors.title ? <p className="text-red-500">{formik.errors.title}</p> : ''}
  //           <input
  //             className="rounded-md"
  //             type="text"
  //             name="bookTitle"
  //             placeholder='Enter the title'
  //             value={formik.values.title}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="publishedDate" className="font-medium text-md block mb-2">Published Date</label>
  //           <input
  //             className="rounded-md"
  //             type="date"
  //             name="publishedDate"
  //             value={formik.values.publishedDate}
  //             onChange={formik.handleChange}
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="summary" className="font-medium text-md block mb-2">Summary</label>
  //           <textarea
  //             className="rounded-md"
  //             name="summary"
  //             cols={18}
  //             rows={4}
  //             placeholder='Enter the summary'
  //             value={formik.values.summary}
  //             onChange={formik.handleChange}
  //           ></textarea>
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="genre" className="font-medium text-md block mb-2">Genre</label>
  //           <select
  //             name="genre"
  //             className="rounded-md"
  //             value={formik.values.genre}
  //             onChange={formik.handleChange}
  //           >
  //             <option value=""></option>
  //             <option value="adventure">Adventure</option>
  //             <option value="apocalyptic">Apocalyptic</option>
  //             <option value="art">Art</option>
  //             <option value="autobiography">Autobiography</option>
  //             <option value="biography">Biography</option>
  //             <option value="business">Business</option>
  //             <option value="childrens fiction">Childrens Fiction</option>
  //             <option value="cooking">Cooking</option>
  //             <option value="education">Education</option>
  //             <option value="fantasy">Fantasy</option>
  //             <option value="health">Health</option>
  //             <option value="history">History</option>
  //             <option value="historical fiction">Historical Fiction</option>
  //             <option value="hobby">Hobby</option>
  //             <option value="horror">Horror</option>
  //             <option value="humor">Humor</option>
  //             <option value="law">Law</option>
  //             <option value="lgbtq">LGBTQ</option>
  //             <option value="memoir">Memoir</option>
  //             <option value="mystery">Mystery</option>
  //             <option value="philosophy">Philosophy</option>
  //             <option value="photography">Photography</option>
  //             <option value="politics">Politics</option>
  //             <option value="relationships">Relationships</option>
  //             <option value="religion">Religion</option>
  //             <option value="romance">Romance</option>
  //             <option value="science fiction">Science Fiction</option>
  //             <option value="self-help">Self-Help</option>
  //             <option value="thriller">Thriller</option>
  //             <option value="travel">Travel</option>
  //             <option value="true crime">True Crime</option>
  //             <option value="young adult">Young Adult</option>
  //           </select>
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="pages" className="font-medium text-md block mb-2">Pages</label>
  //           <input
  //             className="rounded-md"
  //             type="number"
  //             name="pages"
  //             value={formik.values.pages}
  //             onChange={formik.handleChange}
  //           />
  //         </div>
  //         {/* <div className="mb-4">
  //           <label htmlFor="haveRead" className="font-medium text-md block mb-2">Have Read</label>
  //           <input
  //             className="rounded-md"
  //             type="checkbox"
  //             name="haveRead"
  //             checked={formik.values.haveRead}
  //             onChange={formik.handleChange}
  //           /> */}
  //         {/* </div> */}
  //         {/* <div className="mb-4">
  //           <label htmlFor="yearRead" className="font-medium text-md block mb-2">Year Read</label>
  //           <input
  //             className="rounded-md"
  //             type="number"
  //             name="yearRead"
  //             value={formik.values.yearRead}
  //             onChange={formik.handleChange}
  //           />
  //         </div> */}
  //         <div className="mb-4">
  //           <label htmlFor="coverPhoto" className="font-medium text-md block">Cover Photo</label>
  //           <p className="mb-2 text-slate-400 font-extralight">Must be a jpg, jpeg, or png file</p>
  //           {/* {formik.touched.coverPhoto && formik.errors.coverPhoto ? <p className="text-red-500">{formik.errors.coverPhoto}</p> : ''} */}
  //           <input
  //             className="rounded-md"
  //             type="file"
  //             name="coverPhoto"
  //             onChange={(e) => {
  //               formik.setFieldValue("coverPhoto", e.currentTarget.files[0])
  //             }}
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <h2 className="mb-2 text-xl font-semibold">Author Information</h2>
  //           <div className="mb-4">
  //             <label htmlFor="authorFirstName" className="font-medium text-md block mb-2">First Name*</label>
  //             {formik.touched.authorFirstName && formik.errors.authorFirstName ? <p className="text-red-500">{formik.errors.authorFirstName}</p> : ''}
  //             <input
  //               className="rounded-md"
  //               type="text"
  //               name="authorFirstName"
  //               value={formik.values.authorFirstName}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label htmlFor="authorLastName" className="font-medium text-md block mb-2">Last Name*</label>
  //             {formik.touched.authorLastName && formik.errors.authorLastName ? <p className="text-red-500">{formik.errors.authorLastName}</p> : ''}
  //             <input
  //               className="rounded-md"
  //               type="text"
  //               name="authorLastName"
  //               value={formik.values.authorLastName}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //             />
  //           </div>
  //         </div>
  //         <div>
  //           <button type="submit" className="text-md font-medium text-white w-24 bg-blue-600 h-8 rounded-md">Submit</button>
  //         </div>
  //       </form>

  //     </div>
  //     <div className="h-screen">
  //       {/* For the image on one side of the screen */}
  //       <Image 
  //         src={bookPhoto}
  //         alt="Photo of books"
  //         width={900}
  //         className="h-screen"
  //       />
  //     </div>
  //   </div>
  // )
}
  