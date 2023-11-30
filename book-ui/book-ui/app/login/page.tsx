'use client'

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

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
            // console.log(response)
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
      <h1>Signup</h1>
      {errorMessages && <div><p>{errorMessages}</p></div>}
      <form onSubmit={formik.handleSubmit}>
        {isNewUser
          &&
          <div>
            <label htmlFor="name">Name</label>
            {formik.touched.name && formik.errors.name ? <p className="text-red-500">{formik.errors.name}</p> : ''}
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>}

        <label htmlFor="email">Email</label>
        {formik.touched.email && formik.errors.email ? <p className="text-red-500">{formik.errors.email}</p> : ''}
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="password">Password</label>
        {formik.touched.password && formik.errors.password ? <p className="text-red-500">{formik.errors.password}</p> : ''}
        <input
          type="text"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {isNewUser
          &&
          <div>
            <label htmlFor="passwordConfirm">Password Confirm</label>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? <p className="text-red-500">{formik.errors.passwordConfirm}</p> : ''}
            <input
              type="text"
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>}
          <button
            type="submit"
          >{isNewUser ? 'Signup' : 'Login'}</button>
      </form>
      <a onClick={handleClick} className="block">Not a new user? Login here!</a>
    </main>
  )
  }