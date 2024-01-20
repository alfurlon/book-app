import bookshelfbg from '@/public/imgs/bookshelf-bg.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen relative" id='header'>
      <div className='absolute -z-10 opacity-75'>
        <Image 
          src={bookshelfbg}
          alt={`Background image of a bookshelf`}
          className="h-screen w-screen"
        />
      </div>
      <div className="flex h-screen w-screen justify-center content-center">
        <div className='justify-self-center self-center lg:mb-60 lg:ml-20 mb-56'>
          <h1
            className="lg:text-5xl lg:font-bold text-gray-900 leading-tight text-xl font-medium text-center">
            <span
              className="block"
            >
              Modernize your bookshelf: 
            </span>
            <span
              className="block"
            >
              Explore and Organize Your Digital Library 
            </span>
            with 
            <span
              className="text-cyan-600 pl-2"
            >
              The Virtual Bookshelf
            </span>
          </h1>
          <div className='text-white bg-blue-600 rounded-md text-center lg:mr-0 lg:ml-96 lg:mt-8 lg:py-2 lg:w-28 py-1 w-20 mx-auto mt-5'>
            <Link href="/login"><span className='lg:text-lg lg:font-semibold text-md'>Signup</span></Link>
          </div>
        </div>
      </div>
    </main>
  )
}
