import { BsPlusSquareFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className="flex justify-between h-20 items-center">
            <div className="ml-20">
                <Link href="/" className="hover:text-hover-text-color"><h1 className="text-2xl font-bold">The Virtual Bookshelf</h1></Link>
            </div>
            <div className="flex justify-between items-center mr-20">
                <div className="mr-10">
                    <Link href="/book/form" className="hover:text-hover-text-color text-2xl"><BsPlusSquareFill /></Link>
                </div>
                <div className="mr-10">
                    <Link href="/book/gallery" className="hover:text-hover-text-color text-2xl"><FaBookOpen /></Link>
                </div>
                <div>
                    <Link href="/login" className="hover:text-hover-text-color text-2xl"><FaHouseUser /></Link>
                </div>
            </div>
        </div>
    )
}