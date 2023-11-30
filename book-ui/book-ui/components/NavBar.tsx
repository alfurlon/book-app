'use client'

import { BsPlusSquareFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext";
import { useState, Fragment } from "react";
import classNames from "classnames";
import { Dialog, Transition } from '@headlessui/react'


export default function NavBar() {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="flex justify-between h-20 items-center mb-10">
            <div className="ml-20">
                <Link href="/" className="hover:text-hover-text-color"><h1 className="text-3xl font-bold">The Virtual Bookshelf</h1></Link>
            </div>
            {/* {JSON.stringify(user, null, 2)} */}
            <div className="flex justify-between items-center mr-20">
                <div className="mr-10">
                    <Link href="/book/form" className="hover:text-hover-text-color text-2xl"><BsPlusSquareFill /></Link>
                </div>
                <div className="mr-10">
                    <Link href="/book/gallery" className="hover:text-hover-text-color text-2xl"><FaBookOpen /></Link>
                </div>
                {!user?.id
                    ? 
                    <div>
                        <Link href="/login" className="hover:text-hover-text-color text-2xl"><FaUser /></Link>
                    </div>
                    :
                    <div>
                        <FaUserSlash onClick={() => setIsOpen(true)} className="hover:text-hover-text-color text-2xl" />
                    </div>
                }
            </div>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Logout
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to continue? This will log you out.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                setIsOpen(false)
                                                logout()
                                            }}
                                        >
                                            Logout
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}