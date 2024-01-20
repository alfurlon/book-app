'use client'

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import bookshelfbg from '@/public/imgs/bookshelf-bg.jpg'

export default function Home() {
  const [isNewUser, setIsNewUser] = useState<boolean>(true)
  const { login } = useAuth()
  // When I get a login or signup error display it to the user
  // so they know what happened
  // This should rarely happen as I have validation below as well
  const [errorMessages, setErrorMessages] = useState<string>('')

  const router = useRouter();

  const handleClick = () => {
    setIsNewUser(!isNewUser)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().test('isRequired', 'Name is required for new users', function (value) {
        if (isNewUser) {
          return !!value;
        }
        return true;
      }),
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Please enter your password"),
      passwordConfirm: Yup.string().test('isRequired', 'passwordConfirm is required for new users', function (value) {
        if (isNewUser) {
          return !!value;
        }
        return true;
      }).test('passwordMatch', 'Password and passwordConfirm must be the same', function (value, context) {
        if (isNewUser) {
          return value === context.parent.password
        }
        return true
      })
    }),
    onSubmit: values => {
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
      if (isNewUser) {
        formData.append('name', values.name)
        formData.append('passwordConfirm', values.passwordConfirm)
      }

      console.log(formData)

      if (isNewUser) {
        axios.post('http://localhost:3001/api/v1/users/signup', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            login(response.data.token)
          })
          .catch(error => {
            console.log(error)
            setErrorMessages(error.response.data.message)
          })
      } else {
        axios.post('http://localhost:3001/api/v1/users/login', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            // console.log(response)
            login(response.data.data.token)
          })
          .catch(error => {
            console.log(error)
            setErrorMessages(error.response.data.message)
          })
      }
    }
  })

  return (
    <main className="h-screen bg-none">
      <div className="flex justify-center lg:mt-24 rounded-lg lg:h-2/3 lg:mx-32">
        <div className="hidden lg:block">
          <Image
            src={bookshelfbg}
            alt={`Background image of a bookshelf`}
            height={1500}
            width={1500}
            className="h-full"
          />
        </div>
        <div className="w-full bg-slate-50 lg:pl-48 lg:pt-12 lg:h-full pl-14 py-10">
          <h1 className="font-bold pb-4 text-3xl">Welcome Back!</h1>
          {errorMessages && <div><p>{errorMessages}</p></div>}
          <form onSubmit={formik.handleSubmit}>
            {isNewUser
              &&
              <div className="pb-4">
                <label htmlFor="name" className="block font-semibold pb-2">Name</label>
                {formik.touched.name && formik.errors.name ? <p className="text-red-500">{formik.errors.name}</p> : ''}
                <input
                  type="text"
                  name="name"
                  className="rounded-md"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>}
            <div className="pb-4">
              <label htmlFor="email" className="block font-semibold pb-2">Email</label>
              {formik.touched.email && formik.errors.email ? <p className="text-red-500">{formik.errors.email}</p> : ''}
              <input
                type="email"
                name="email"
                className="rounded-md"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="pb-4">
              <label htmlFor="password" className="block font-semibold pb-2">Password</label>
              {formik.touched.password && formik.errors.password ? <p className="text-red-500">{formik.errors.password}</p> : ''}
              <input
                type="password"
                name="password"
                className="rounded-md"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {isNewUser
              &&
              <div className="pb-4">
                <label htmlFor="passwordConfirm" className="block font-semibold pb-2">Password Confirm</label>
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? <p className="text-red-500">{formik.errors.passwordConfirm}</p> : ''}
                <input
                  type="password"
                  name="passwordConfirm"
                  className="rounded-md"
                  placeholder="Enter password again"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>}
              <button
                type="submit"
                className="text-md font-medium text-white bg-blue-600 rounded-md text-center block mb-4 px-4 py-2"
              >{isNewUser ? 'Sign Up' : 'Login'}</button>
          </form>
          <p>{isNewUser ? <span>Not a new user? <a onClick={handleClick} className="hover:cursor-pointer text-submit-btn-color underline" >Login here!</a></span> : <span>Not a current user? <a onClick={handleClick} className="hover:cursor-pointer text-submit-btn-color underline" >Sign up here!</a></span>}</p>
        </div>
      </div>
    </main>
  )
  }