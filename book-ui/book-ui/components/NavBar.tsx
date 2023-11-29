'use client'

import { BsPlusSquareFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import classNames from "classnames";

export default function NavBar() {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex justify-between h-20 items-center mb-10">
            <div className="ml-20">
                <Link href="/" className="hover:text-hover-text-color"><h1 className="text-3xl font-bold">The Virtual Bookshelf</h1></Link>
            </div>
            <div className="flex justify-between items-center mr-20">
                <div className="mr-10">
                    <Link href="/book/form" className="hover:text-hover-text-color text-2xl"><BsPlusSquareFill /></Link>
                </div>
                <div className="mr-10">
                    <Link href="/book/gallery" className="hover:text-hover-text-color text-2xl"><FaBookOpen /></Link>
                </div>
                {!user
                    ? 
                    <div>
                        <Link href="/login" className="hover:text-hover-text-color text-2xl"><FaUser /></Link>
                    </div>
                    :
                    <div>
                        <FaUserSlash onClick={handleOpenModal} className="hover:text-hover-text-color text-2xl" />
                    </div>
                }
                <div className={classNames({ 'hidden': !isOpen })}>
                    <h2>Logout</h2>
                    <p>This will log you out of the application.</p>
                    <div>
                        <button onClick={handleOpenModal}>Cancel</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}