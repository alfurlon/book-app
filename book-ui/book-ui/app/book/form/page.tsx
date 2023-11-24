'use client'

import bookPhoto from "../../../public/imgs/bookshelf-bg.jpg"
import Image from "next/image"
import { useFormik } from "formik"
import { Book, emptyBook } from "@/types/Book"
import { Author, emptyAuthor } from "@/types/Author"
import { User, emptyUser } from "@/types/User"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter();

  // formik
  const formik = useFormik({
    initialValues: {
      bookTitle: '',
      // publishedDate: new Date(),
      summary: '',
      genre: '',
      pages: 0,
      haveRead: false,
      yearRead: 0,
      coverPhoto: null,
      authorFirstName: '',
      authorLastName: ''
    },
    validationSchema: Yup.object({
      bookTitle: Yup.string().required("Must include a title"),
      summary: Yup.string(),
      genre: Yup.string(),
      pages: Yup.number(),
      haveRead: Yup.boolean(),
      yearRead: Yup.number(),
      coverPhoto: Yup.mixed().required("Must include a cover photo. Must be less than 100MB"),
      authorFirstName: Yup.string().required("Must include an author first name"),
      authorLastName: Yup.string().required("Must include an author last name")
    }),
    onSubmit: values => {
      const formData = new FormData()
      formData.append('title', values.bookTitle)
      formData.append('summary', values.summary)
      formData.append('genre', values.genre)
      formData.append('pages', values.pages.toString())
      formData.append('yearRead', values.yearRead.toString())
      console.log('coverPhoto: ', values.coverPhoto)
      if (values.coverPhoto !== null) {
        formData.append('coverPhoto', values.coverPhoto as Blob)
      }
      formData.append('authorFirstName', values.authorFirstName)
      formData.append('authorLastName', values.authorLastName)

      // alert(JSON.stringify(values.coverPhoto, null, 2))
      // console.log('FormData: ', formData)

      axios.post('http://localhost:3001/api/v1/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(data => {
        console.log(data)
        router.push('/book/gallery')
      })
      .catch(err => console.log(err))
    }
  })

  // useEffect(() => {
  //   console.log('formik.values.coverPhoto:', formik.values.coverPhoto);
  // }, [formik.values.coverPhoto]);

  return (
    <div className="h-screen bg-none flex justify-between">
      <div className="ml-40">
        {/* For the title of the page and the form */}
        <h1 className="text-3xl font-bold">Add a Book</h1>
        <p className="mb-6 text-slate-400 font-extralight">* indicates required</p>
        <form onSubmit={formik.handleSubmit} className="mb-20" encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="bookTitle" className="font-medium text-md block mb-2">Book Title*</label>
            {formik.touched.bookTitle && formik.errors.bookTitle ? <p className="text-red-500">{formik.errors.bookTitle}</p> : ''}
            <input
              className="rounded-md"
              type="text"
              name="bookTitle"
              placeholder="Enter the title"
              value={formik.values.bookTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publishedDate" className="font-medium text-md block mb-2">Published Date</label>
            <input
              className="rounded-md"
              type="date"
              name="publishedDate"
              // value={formik.values.publishedDate}
              // onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="font-medium text-md block mb-2">Summary</label>
            <textarea
              className="rounded-md"
              name="summary"
              cols={18}
              rows={4}
              value={formik.values.summary}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="font-medium text-md block mb-2">Genre</label>
            <select
              name="genre"
              className="rounded-md"
              value={formik.values.genre}
              onChange={formik.handleChange}
            >
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
          <div className="mb-4">
            <label htmlFor="pages" className="font-medium text-md block mb-2">Pages</label>
            <input
              className="rounded-md"
              type="number"
              name="pages"
              value={formik.values.pages}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="haveRead" className="font-medium text-md block mb-2">Have Read</label>
            <input
              className="rounded-md"
              type="checkbox"
              name="haveRead"
              value={formik.values.haveRead.toString()}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yearRead" className="font-medium text-md block mb-2">Year Read</label>
            <input
              className="rounded-md"
              type="number"
              name="yearRead"
              value={formik.values.yearRead}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coverPhoto" className="font-medium text-md block">Cover Photo</label>
            <p className="mb-2 text-slate-400 font-extralight">Must be a jpg, jpeg, or png file</p>
            {formik.touched.coverPhoto && formik.errors.coverPhoto ? <p className="text-red-500">{formik.errors.coverPhoto}</p> : ''}
            <input
              className="rounded-md"
              type="file"
              name="coverPhoto"
              onChange={(e) => {
                // console.log(e.currentTarget.files[0])
                formik.setFieldValue("coverPhoto", e.currentTarget.files[0])
                // console.log(formik.values.coverPhoto)
              }}
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Author Information</h2>
            <div className="mb-4">
              <label htmlFor="authorFirstName" className="font-medium text-md block mb-2">First Name*</label>
              {formik.touched.authorFirstName && formik.errors.authorFirstName ? <p className="text-red-500">{formik.errors.authorFirstName}</p> : ''}
              <input
                className="rounded-md"
                type="text"
                name="authorFirstName"
                value={formik.values.authorFirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="authorLastName" className="font-medium text-md block mb-2">Last Name*</label>
              {formik.touched.authorLastName && formik.errors.authorLastName ? <p className="text-red-500">{formik.errors.authorLastName}</p> : ''}
              <input
                className="rounded-md"
                type="text"
                name="authorLastName"
                value={formik.values.authorLastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="text-md font-medium text-white w-24 bg-blue-600 h-8 rounded-md">Submit</button>
          </div>
        </form>

      </div>
      <div className="h-screen">
        {/* For the image on one side of the screen */}
        <Image 
          src={bookPhoto}
          alt="Photo of books"
          width={900}
          className="h-screen"
        />
      </div>
    </div>
  )
}
  