import { useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import CustomInput from '@/components/forms/CustomInput'
import { Button, Checkbox, Label, Spinner } from 'flowbite-react'
import axios from 'axios'
import router from 'next/router'
import { signIn } from 'next-auth/react'

const Register = () => {
  const [loginError, setLoginError] = useState('') // This will be used to show a message if the submission is successful
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState('US')
  const base_url = process.env.NEXT_PUBLIC_BASE_URL

  const validationSchema = yup.object({
    username: yup
      .string()
      .test(
        'username-backend-validation', // Name
        'Username taken', // Msg
        async (username: any) => {
          // Res from backend will be flag at res.data.success, true for
          // username good, false otherwise
          if (username && username.length >= 3) {
            const {
              data: { success },
            } = await axios.post(base_url + 'users/validate-username', {
              username: username,
            })

            return !success
          }
          return true
        },
      )
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .trim()
      .required('Username is required'),
    firstname: yup.string().trim().required('First Name is required'),
    lastname: yup.string().trim().required('Last Name is required'),
    email: yup
      .string()
      .trim()
      .email('Must be a valid email')
      .required('Email is required')
      .test(
        'email-backend-validation', // Name
        'Email is already registered', // Msg
        async (email) => {
          // Res from backend will be flag at res.data.success, true for
          // username good, false otherwise
          if (email && email.length >= 3) {
            const {
              data: { success },
            } = await axios.post(base_url + 'users/validate-email', {
              email: email,
            })
            return !success
          }
          return true
        },
      ),
    password: yup
      .string()
      .min(8, 'Must Contain 8 Characters')
      .required()
      .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })

  const handleSubmit = async (values: any) => {
    setLoading(true)

    if (location == '') {
      setLoading(false)
      return alert('Please select a country')
    }
    try {
      const res = await axios.post(base_url + 'auth/register', {
        email: values.email,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        location: location,
      })
      if (res.data.user) {
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: `${window.location.origin}/`,
          redirect: false,
        })

        if (res?.error) setLoginError(res.error)
        if (res?.url) router.push(res.url)
      }
    } catch (error : any) {
      setLoginError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-screen-md md:max-w-xl w-full antialiased">
      <div className="py-10">
        <h1 className="gradText text-xl md:text-2xl md:font-bold leading-5 font-semibold">
          Welcome,
        </h1>
        <h3 className="text-white font-normal text-sm leading-5 border-b border-[#343434] py-1 mb-5">
          Create account below
        </h3>
        <div>
          <Formik
            initialValues={{
              username: '',
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Form
                  autoComplete="off"
                  className="w-full py-2 grid grid-cols-1 md:grid-cols-2 md:gap-5"
                >
                  <CustomInput name="firstname" label="First Name" />
                  <CustomInput name="lastname" label="Last Name" />
                  <CustomInput name="username" label="Username" />
                  <CustomInput name="email" label="Email" />
                  {/* <div className="mb-4 w-full md:col-span-2">
                    <label className="block text-gray-400 text-sm pb-1 font-medium">
                      Location
                    </label>
                    <ReactFlagsSelect
                      selected={location}
                      placeholder="Enter Location"
                      searchable
                      className="bg-inputBg"
                      onSelect={(code) => setLocation(code)}
                    />
                  </div> */}

                  <CustomInput
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <CustomInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                  <div className="flex items-center gap-2 my-2 md:col-span-2">
                    <Checkbox
                      id="agree"
                      className="!w-6 !h-6  !bg-inputBg !ring-0 !outline-0 !border-0"
                    />
                    <Label htmlFor="agree" className="!text-white">
                      I have read and agree to the{' '}
                      <Link href="/terms-and-condition" className="gradText">
                        Terms of Service
                      </Link>
                    </Label>
                  </div>
                  <Button
                    disabled={loading}
                    className="w-full gradButton mt-10 md:col-span-2"
                    type="submit"
                  >
                    {!loading ? (
                      <p>Create Account</p>
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
            Already have an account?{' '}
            <Link href="/login">
              <span className="gradText ml-1 text-sm font-semibold">Login</span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Register
