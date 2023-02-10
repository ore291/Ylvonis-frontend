import { Formik, Form } from 'formik'
import * as yup from 'yup'
import React, { useRef, useState, useEffect } from 'react'
import CustomInput from '../forms/CustomInput'
import Image from 'next/image'
import { useGetUserQuery, useUpdateProfileMutation } from '@/store/api/user'
import Loading from '../utils/Loading'
import ReactFlagsSelect from 'react-flags-select'
import { BsCameraFill, BsFillCameraFill } from 'react-icons/bs'
import axios from 'axios'
import { useRouter } from 'next/router'

const Settings = () => {
  const [location, setLocation] = useState('')
  const router = useRouter()

  const [
    updateProfile, // This is the mutation trigger
    { isLoading: isUpdating, isSuccess: updated }, // This is the destructured mutation result
  ] = useUpdateProfileMutation()

  const base_url = process.env.NEXT_PUBLIC_BASE_URL

  const handleSubmit = (values: any) => {
    const formdata = new FormData()

    formdata.append('bio', values.bio)
    formdata.append('username', values.username)
    formdata.append('location', location)

    if (file) {
      formdata.append('file', file)
    }
    updateProfile(formdata)
  }

  useEffect(() => {
    if (!updated) return

    router.push('/profile')
  }, [updated])

  const { data, isFetching, isLoading, isError, isSuccess } = useGetUserQuery(
    null,
  )

  useEffect(() => {
    if (!isSuccess) return

    setLocation(data.user.location)
  }, [isSuccess])

  const [file, setFile] = useState(null)

  const imageInputRef = useRef(null)

  const handleImageClick = () => {
    // 👇️ open file input box on click of other element
    if (imageInputRef != null) {
      imageInputRef?.current?.click()
    }
  }

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event?.target?.files && event.target.files

    if (!files) {
      return
    }
    setFile(files[0])
  }

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
              id: data.user.id,
            })

            return !success
          }
          return true
        },
      )
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .trim(),
    bio: yup.string().max(400, 'You can only use 400 words'),
  })

  if (isLoading) {
    return (
      <div className="w-full h-[70vh]">
        <Loading w="8" h="8" />
      </div>
    )
  }
  return data != null ? (
    <div className="md:w-3/4 overflow-scroll max-h-[68vh] rounded-md bg-bgGray ">
      <Formik
        initialValues={{
          username: data.user.username,

          bio: data.user.bio,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <div className="flex items-center justify-between p-2 my-4 md:gap-3">
                <div className="flex-container space-x-2">
                  <div
                    onClick={() => handleImageClick()}
                    className=" relative h-20 w-20 bg-white rounded-full cursor-pointer"
                  >
                    <Image
                      src={
                        file ? URL.createObjectURL(file) : data.user.profile_pic
                      }
                      alt=""
                      sizes=""
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="rounded-full "
                    />
                    <div className="absolute bottom-2 -right-1">
                      <BsFillCameraFill className="w-5 h-5 fill-brand" />
                    </div>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="capture=camera,image/png, image/gif, image/jpeg, image/jpg"
                      hidden
                      onChange={(e) => handleFileChange(e)}
                      ref={imageInputRef}
                    />
                  </div>
                  <div className="mt- flex flex-col gap-0">
                    <h1 className="text-sm md:text-xl font-semibold md:font-bold capitalize">
                      {data.user.firstname} {data.user.lastname}
                    </h1>
                  </div>
                </div>

                <div className="  flex-container space-x-1  text-utilGray">
                  <button
                    className="gradButton min-w-16 rounded-md  px-2 py-1 block !text-xs  capitalize flex-container"
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loading w="3" h="3" />
                    ) : (
                      <span>Update </span>
                    )}
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="min-w-16 bg-transparent capitalize mr-2 border-purple-600 border-solid border-2 p-1 hover:bg-brand hover:text-white !text-xs rounded"
                  >
                    cancel
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
                <CustomInput
                  value={data.user.username}
                  name="username"
                  label="Username"
                  type="text"
                  border={true}
                />

                <div className="mb-4 w-full">
                  <label className="block text-gray-400 text-sm pb-1 font-medium">
                    Location
                  </label>

                  <ReactFlagsSelect
                    selected={location}
                    placeholder="Enter Location"
                    className="!bg-inputBg border border-gray-50 rounded-md  child:!bg-inputBg child:text-white"
                    selectButtonClassName="!bg-inputBg"
                    onSelect={(code) => setLocation(code)}
                  />
                </div>

                <div className="md:col-span-2">
                  <CustomInput
                    name="bio"
                    label="Short Biography"
                    type="textBox"
                    border={true}
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      {/* */}
    </div>
  ) : (
    <div></div>
  )
}

export default Settings
