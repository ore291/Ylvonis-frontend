import { RoutesType } from '@/components/library/mainpage'
import { Button } from '@/components/UI'
import { IUser } from '@/lib/interfaces'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  BsChevronDown, BsFillQuestionCircleFill,
  BsPower
} from 'react-icons/bs'
import { FaCog, FaUserCircle } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { TbUsers } from 'react-icons/tb'
import listenForOutsideClick from '../../components/utils/outsideClick'

export const ProfileDropdown = ({ user }: { user: IUser }) => {
  const [dropDownOpen, setDropDownOpen] = React.useState(false)

  const toggle = (dropDownOpen: boolean) => {
    return setDropDownOpen(!dropDownOpen)
  }

  const profileMenuRef = useRef(null)
  const [listening, setListening] = useState(false)
  useEffect(
    listenForOutsideClick(listening, setListening, profileMenuRef, setDropDownOpen),
  )

  const routes: RoutesType[] = [
    {
      title: 'Profile',
      icon: <RxAvatar size={23} className="gradSVG" />,
      link: '/profile',
    },
    {
      title: 'help',
      icon: <BsFillQuestionCircleFill size={23} className="gradSVG" />,
      link: '/help',
    },
    {
      title: 'switch account',
      icon: <TbUsers size={23} className="gradSVG" />,
      link: '/login',
    },
    {
      title: 'settings',
      icon: <FaCog size={23} className="gradSVG" />,
      link: '/settings',
    },
    // {
    //   title: 'log out',
    //   icon: <BsPower size={23} className="gradSVG" />,
    //   link: '/login'
    // },
  ]

  return (
    <div className="relative" ref={profileMenuRef}>
      <button
        id="dropdownAvatarNameButton"
        className="flex items-center text-sm font-medium space-x-3 rounded-full bg-bgGray  p-1 capitalize px-0.5 md:mr-0 text-white"
        onClick={() => setDropDownOpen((prev) => !prev)}
      >
        {user?.profile_pic ? (
          <div className="w-6 h-6  relative rounded-full text-white bg-white">
            {' '}
            <Image
              src={user.profile_pic}
              alt=""
              className="rounded-full"
              fill
              style={{ objectFit: 'contain' }}
            />
            
          </div>
        ) : (
          <FaUserCircle className="w-6 h-6  rounded-full text-white bg-gray-700" />
        )}
        <div className="flex items-center space-x-1">
          {user?.username}
          <BsChevronDown className="w-4 h-4 mx-1.5" />
        </div>
      </button>

      {/* dropdown menu */}
      <div
        id="dropdownAvatarName"
        className={`z-10 ${
          dropDownOpen ? 'absolute' : 'hidden'
        } bg-bgGray text-white top-9 divide-y left-[-40px] rounded shadow w-44 `}
      >
        <ul
          className="py-2 px-2 text-sm flex flex-col space-y-3"
          aria-labelledby="dropdownInformationButton"
        >
          {routes.map((route, index) => (
            <li key={index}>
              <Link href={route.link}>
                <div className="flex text-base justify-start items-center capitalize py-1 gap-2">
                  {route.icon}
                  <span className="text-white hover:text-brand">
                    {route.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <div
              className="flex text-base justify-start items-center capitalize py-1 cursor-pointer gap-2"
              onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
            >
              <BsPower size={23} className="gradSVG" />
              <span className="text-white hover:text-brand">Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
