import bookshelfbg from '@/public/imgs/bookshelf-bg.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen relative">
      <div className='absolute -z-10 opacity-75'>
        <Image 
          src={bookshelfbg}
          alt={`Background image of a bookshelf`}
          className="h-screen w-screen"
        />
      </div>
      <div className="flex h-screen w-screen justify-center content-center">
        <div className='justify-self-center self-center mb-60 ml-20'>
          <h1
            className="text-5xl font-bold text-gray-900 leading-tight">
            <span
              className="block"
            >
              Revolutionize Your Reading Experience: 
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
          <div className=' text-white bg-blue-600 rounded-md text-center h-12 w-28 pt-2 mt-8'>
            <Link href="/login"><span className='text-lg font-semibold'>Signup</span></Link>
          </div>
        </div>
      </div>
    </main>
  )
}
