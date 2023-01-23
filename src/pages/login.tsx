import { useState, useEffect } from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { signIn, signOut } from 'next-auth/react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import CustomInput from '@/components/forms/CustomInput'
import { Button, Checkbox, Label, Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'

const Login = () => {
  const [message, setMessage] = useState('') // This will be used to show a message if the submission is successful
  const [accepted, setAccepted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Required'),
  })

  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    setLoading(true)
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) setLoginError(res.error)
    if (res?.url) router.push(res.url)
  }

  return (
    <div className="mx-auto max-w-screen-md md:max-w-lg w-full antialiased p-1">
      <div className="py-14">
        <h1 className="gradText text-xl leading-5 font-semibold">
          Welcome Back,
        </h1>
        <h3 className="text-white font-normal text-sm leading-5 border-b border-[#343434] py-1 mb-8">
          Login below
        </h3>
        <div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Form className="w-full py-2">
                  <CustomInput name="email" label="Email" />
                  <CustomInput
                    name="password"
                    label="Password"
                    type="password"
                  />

                  <div className="flex items-center gap-2 my-2">
                    <Checkbox
                      id="agree"
                      className="!w-6 !h-6  !bg-inputBg !ring-0 !outline-0 !border-0"
                    />
                    <Label htmlFor="agree" className="!text-white">
                      Remember me
                    </Label>
                  </div>

                  <Link href="/forgot-password">
                    <h4 className="gradText text-center my-6 text-sm font-semibold">
                      Forgot Password?
                    </h4>
                  </Link>
                  <Button disabled={loading} className="w-full gradButton mt-10" type="submit">
                    {!loading ? (
                      <p>Login</p>
                    ) : (
                      <Spinner
                        color="success"
                        aria-label="Success spinner example"
                      />
                    )}
                  </Button>
                </Form>
              )
            }}
          </Formik>
          <div className={`${!loginError ? 'hidden' : ''}`}>
            <p className="text-xs font-semibold text-left text-red-500">
              Incorrect email or password
            </p>
          </div>
          <h2 className="hr-lines"> OR </h2>
          <h4 className="text-center text-xs font-medium text-white my-1">
            Continue with
          </h4>
          <div className="grid grid-cols-2 gap-x-3 px-1 my-11">
            <Button
              type="button"
              className="text-white font-semibold leading-5 bg-inputBg  focus:ring-4 focus:ring-[#050708]/50  rounded-lg text-sm  text-center hover:bg-inputBg/90 w-full"
            >
              <svg
                className="mr-2 -ml-1 w-6 h-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                />
              </svg>
              Apple
            </Button>
            <Button
              type="button"
              className="text-white w-full bg-inputBg leading-5  focus:ring-4 focus:ring-[#050708]/50 font-semibold rounded-lg text-sm  text-center hover:bg-inputBg/90 "
            >
              <FcGoogle
                className="mr-2 -ml-1 w-6 h-6"
                aria-hidden="true"
                focusable="false"
              />
              Google
            </Button>
          </div>
          <h4 className="text-center text-xs font-medium leading-5 text-white my-1">
            Don't have an account?{' '}
            <Link href="/register">
              <span className="gradText ml-1 text-sm font-semibold">
                Create Account
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Login
