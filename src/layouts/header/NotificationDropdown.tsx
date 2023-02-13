import React, { useEffect, useState, useRef } from 'react'
import { SlBell } from 'react-icons/sl'
import { SlOptionsVertical } from 'react-icons/sl'
import Link from 'next/link'
import Image from 'next/image'
import { BsBellFill, BsFillBellFill } from 'react-icons/bs'
import listenForOutsideClick from '../../components/utils/outsideClick'
import { useGetUserNotificationsQuery } from '@/store/api/feed'
import Loading from '@/components/utils/Loading'
import { intlFormatDistance } from 'date-fns'

interface NotificationTypes {
  type?: string
  img: string
  userImages?: Object
  artist?: string
  title?: string
  date?: any
}

export const NotificationDropdown = (props: {
  notifications?: NotificationTypes[]
}) => {
  const [dropDownOpen, setDropDownOpen] = React.useState(false)

  const {
    data,
    isFetching,
    isLoading,
  } = useGetUserNotificationsQuery(
    { page: 1, size: 5 },
    {
      pollingInterval: 300000,
      skip: false,
    },
  )

  const toggle = (dropDownOpen: boolean) => {
    return setDropDownOpen(!dropDownOpen)
  }

  const menuRef = useRef(null)
  const [listening, setListening] = useState(false)
  useEffect(
    listenForOutsideClick(listening, setListening, menuRef, setDropDownOpen),
  )

  // const notifications = props.notifications

  return (
    <div className="relative" ref={menuRef}>
      <button
        id="dropdownNotificationButton"
        onClick={() => setDropDownOpen((prev) => !prev)}
        className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <BsFillBellFill className="text-white h-6 w-6" />
        <div className="relative flex">
          <div className="relative inline-flex w-2 h-2 bg-red-500  rounded-full -top-2 right-2 dark:border-gray-900" />
        </div>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownNotification"
        className={`z-50 ${
          dropDownOpen ? 'absolute' : 'hidden'
        } bg-bgGray w-[400px]   top-9  -right-32   rounded shadow`}
      >
        {isLoading ? (
          <div className="h-full w-full py-5 flex-container">
            <Loading w="3" h="3" />
          </div>
        ) : (
          <>
            <div className="py-3 px-4  font-medium text-sm text-start ">
              Notifications
            </div>
            {data && data?.notifications.length > 0 ? (
              <div className="col-container  max-h-[52vh] overflow-scroll">
                {/*  */}
                {data.notifications?.map((notification: any, index: number) => (
                  <Link href={`/profile/${notification.user.username}`} className="flex items-center px-4 space-x-2 py-3 w-full " key={index}>
                    <div className="col-container w-4/12">
                      <div className="relative h-[60px] w-[60px]    rounded-full text-white bg-white">
                        {' '}
                        <Image
                          src={notification.user.profile_pic}
                          alt=""
                          className="rounded-full"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col space-y-1 !capitalize">
                      {/* <span className="text-gray-500 text-xs  ">
                        {notification.type}{' '}
                      </span> */}
                      <span className="!m-0 !p-0 text-xs max-w-full truncate">{notification.message}</span>
                      <span className="text-brand text-xs  ">
                        {notification.user.username}
                      </span>
                    </div>
                    <div className="flex-col flex justify-between">
                      <div className="ml-auto">
                        <SlOptionsVertical size={10} className="rotate-90" />
                      </div>
                      <div className="text-xs text-gray-500 truncate ">
                        {intlFormatDistance(new Date(notification.createdAt), new Date())}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm pl-2 text-white font-semibold">
                You have no new notifications.
              </p>
            )}

            <Link
              href="/notifications"
              className="block  py-2 text-sm font-medium text-center text-white"
            >
              <div className="inline-flex items-center hover:text-brand">
                View all
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
