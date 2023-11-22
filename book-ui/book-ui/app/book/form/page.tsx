import bookPhoto from "../../../public/imgs/bookshelf-bg.jpg"
import Image from "next/image"

export default function Home() {


  return (
    <div className="h-screen bg-none flex justify-between">
      <div className="ml-40">
        {/* For the title of the page and the form */}
        <h1 className="text-3xl font-bold mb-8">Add a Book</h1>
        <form action="" method="post">
          <div className="mb-4">
            <label htmlFor="book-title" className="font-medium text-md block mb-2">Book Title</label>
            <input type="text" name="book-title" required />
          </div>
          <div className="mb-4">
            <label htmlFor="published-date" className="font-medium text-md block mb-2">Published Date</label>
            <input type="date" name="published-date" id="" />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="font-medium text-md block mb-2">Summary</label>
            <input type="text" />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="font-medium text-md block mb-2">Genre</label>
            <input type="checkbox" name="genre" id="" />
          </div>
          <div className="mb-4">
            <label htmlFor="pages" className="font-medium text-md block mb-2">Pages</label>
            <input type="text" />
          </div>
          <div className="mb-4">
            <label htmlFor="have-read" className="font-medium text-md block mb-2">Have Read</label>
            <input type="checkbox" name="have-read" id="" />
          </div>
          <div className="mb-4">
            <label htmlFor="year-read" className="font-medium text-md block mb-2">Year Read</label>
            <input type="text" />
          </div>
          <div className="mb-4">
            <label htmlFor="cover-photo" className="font-medium text-md block mb-2">Cover Photo</label>
            <input type="file" name="cover-photo" id="" />
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Author Information</h2>
            <div className="mb-4">
              <label htmlFor="first-name" className="font-medium text-md block mb-2">First Name</label>
              <input type="text" />
            </div>
            <div className="mb-4">
              <label htmlFor="last-name" className="font-medium text-md block mb-2">Last Name</label>
              <input type="text" />
            </div>
          </div>
        </form>
        <div>
          <button type="submit" className="text-md font-medium text-white w-24 bg-blue-600 h-8 rounded-md">Submit</button>
        </div>
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
  