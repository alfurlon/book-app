'use client'

import bookshelfbg from '@/public/imgs/bookshelf-bg.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth()

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
        <div className='justify-self-center self-center lg:mb-60 md:my-auto lg:ml-20 mb-56'>
          <h1
            className="lg:text-5xl md:font-bold md:text-2xl text-gray-900 leading-tight text-xl font-medium text-center">
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
          <div className='text-white bg-blue-600 rounded-md text-center lg:mr-0 lg:ml-96 lg:mt-8 md:py-2 py-1 lg:w-32 w-28 mx-auto mt-5'>
            {!user?.id
              ? <Link href="/login"><span className='lg:text-lg lg:font-semibold text-md'>Signup</span></Link>
              : <Link href="/book/gallery"><span className='lg:text-lg lg:font-semibold lg:px-2 text-md'>Your Gallery</span></Link> }
            
          </div>
        </div>
      </div>
    </main>
  )
}
