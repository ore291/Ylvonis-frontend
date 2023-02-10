import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs'
import CustomInput from '../forms/CustomInput'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useGetUserQuery } from '@/store/api/user'
import Settings from './Settings'
import { signOut, useSession } from 'next-auth/react'

function MainPage() {
  const user = {
    profileImg: '/ckay2.png',
    name: 'ckay ckay',
    posts: '',
    followers: '',
    following: '',
  }

  const settings = [
    'Edit Profile',
    'data saver',
    'worldview',
    'language',
    'sound',
    'content',
    'device',
    'car',
    'privacy',
    'streaming',
    'storage',
    'notifications',
    'targeted ads',
    'about',
  ]

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  const { data: session, status } = useSession()

  return (
    <main>
      {/* mobile settings view */}
      <section className="md:hidden">
        <Link href={'/profile'}>
          <div className="row-container p-2 my-4 gap-3">
            <div className=" relative h-20 w-20">
              <Image
                src={session?.user?.profile_pic}
                alt=""
                sizes=""
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="rounded-full "
              />
            </div>
            <div className="mt- flex flex-col gap-0">
              <h1 className="text-xl font-bold capitalize">
                {session?.user?.firstname} {session?.user?.lastname}
              </h1>

              <span className="text-xsm text-utilGray ">view profile</span>
            </div>
            <div className="ml-auto cursor-pointer text-utilGray">
              <Link href={'/settings/profile'}>
                <BsChevronRight size={30} />
              </Link>
            </div>
          </div>
        </Link>
        <div>
          {settings.map((setting, index) => (
            <Link href={`/settings/profile`} key={index}>
              {' '}
              <div
                className="row-container p-2 capitalize py-4 border-b-[0.5px] border-solid border-utilGray "
                key={index}
              >
                <div className="text-lg font-bold ">{setting}</div>
                <div className="ml-auto cursor-pointer text-utilGray">
                  <BsChevronRight size={30} />
                </div>
              </div>{' '}
            </Link>
          ))}
        </div>
        <div className="w-full flex-container mt-10">
          <button
            onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
            className="w-40 h-10 rounded-md gradButton px-2"
          >
            <span>Log Out</span>
          </button>
        </div>
      </section>

      {/* desktop settings view */}
      <section className="hidden py-10 md:flex gap-2">
        <div className="w-1/4 overflow-scroll max-h-[68vh] rounded-md bg-bgGray">
          <div className="row-container p-2 capitalize py-4 cursor-pointer border-b-[0.5px] border-solid border-utilGray ">
            <div className="text-sm font-normal gradText ">
              Profile Settings
            </div>
            <div className="ml-auto cursor-pointer text-utilGray">
              <Link href={`/settings/profile`}>
                <BsChevronRight size={20} />
              </Link>
            </div>
          </div>

          {settings.map((setting, index) => (
            <div
              className="row-container p-2 capitalize cursor-pointer py-4 border-b-[0.5px] border-solid border-utilGray "
              key={index}
            >
              <div className="text-sm font-normal text-utilGray ">
                {setting}
              </div>
              <div className="ml-auto cursor-pointer text-utilGray">
                <Link href={`/settings/#`}>
                  <BsChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Settings />
      </section>
    </main>
  )
}

export default MainPage
