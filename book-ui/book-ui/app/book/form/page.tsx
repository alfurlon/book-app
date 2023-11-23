'use client'

import bookPhoto from "../../../public/imgs/bookshelf-bg.jpg"
import Image from "next/image"
import { useFormik } from "formik"
import { Book, emptyBook } from "@/types/Book"
import { Author, emptyAuthor } from "@/types/Author"
import { User, emptyUser } from "@/types/User"
import * as Yup from "yup"

export default function Home() {
  // formik
  const formik = useFormik({
    initialValues: {
      bookTitle: '',
      // publishedDate: new Date(),
      summary: '',
      // genre: [],
      pages: 0,
      haveRead: false,
      yearRead: 0,
      // coverPhoto: ?
      authorFirstName: '',
      authorLastName: ''
    },
    validationSchema: Yup.object({
      
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })


  return (
    <div className="h-screen bg-none flex justify-between">
      <div className="ml-40">
        {/* For the title of the page and the form */}
        <h1 className="text-3xl font-bold">Add a Book</h1>
        <p className="mb-6">* indicates required</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bookTitle" className="font-medium text-md block mb-2">Book Title*</label>
            <input
              className="rounded-md"
              type="text"
              name="bookTitle"
              required
              placeholder="Enter the title"
              value={formik.values.bookTitle}
              onChange={formik.handleChange}
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
              // value={formik.values.genre}
              // onChange={formik.handleChange}
            >
              <option value="">Adventure</option>
              <option value="">Apocalyptic</option>
              <option value="">Art</option>
              <option value="">Autobiography</option>
              <option value="">Biography</option>
              <option value="">Business</option>
              <option value="">Childrens Fiction</option>
              <option value="">Cooking</option>
              <option value="">Education</option>
              <option value="">Fantasy</option>
              <option value="">Health</option>
              <option value="">History</option>
              <option value="">Historical Fiction</option>
              <option value="">Hobby</option>
              <option value="">Horror</option>
              <option value="">Humor</option>
              <option value="">Law</option>
              <option value="">LGBTQ</option>
              <option value="">Memoir</option>
              <option value="">Mystery</option>
              <option value="">Philosophy</option>
              <option value="">Photography</option>
              <option value="">Politics</option>
              <option value="">Relationships</option>
              <option value="">Religion</option>
              <option value="">Romance</option>
              <option value="">Science Fiction</option>
              <option value="">Self-Help</option>
              <option value="">Thriller</option>
              <option value="">Travel</option>
              <option value="">True Crime</option>
              <option value="">Young Adult</option>
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
            <label htmlFor="coverPhoto" className="font-medium text-md block mb-2">Cover Photo</label>
            <input
              className="rounded-md"
              type="file"
              name="coverPhoto"
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Author Information</h2>
            <div className="mb-4">
              <label htmlFor="authorFirstName" className="font-medium text-md block mb-2">First Name*</label>
              <input
                className="rounded-md"
                type="text"
                name="authorFirstName"
                required
                value={formik.values.authorFirstName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="authorLastName" className="font-medium text-md block mb-2">Last Name*</label>
              <input
                className="rounded-md"
                type="text"
                name="authorLastName"
                required
                value={formik.values.authorLastName}
                onChange={formik.handleChange}
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
  