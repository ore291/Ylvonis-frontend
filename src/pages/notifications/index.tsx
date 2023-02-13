import React from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { AiFillNotification } from 'react-icons/ai'
import { useGetUserNotificationsQuery } from '@/store/api/feed'
import Loading from '@/components/utils/Loading'
import { MdOutlineNotificationsOff } from 'react-icons/md'
import Image from 'next/image'
import { intlFormatDistance } from 'date-fns'
import Link from "next/link"

function Notifications() {
  const { data, isFetching, isLoading } = useGetUserNotificationsQuery(
    { page: 1, size: 50 },
    {
      pollingInterval: 300000,
      skip: false,
    },
  )
  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Notifications"
      nested={true}
    >
      <div className="max-w-4xl mx-auto md:p-5">
        <h1 className="text-lg mb-2 md:mb-5 md:text-2xl p-4  font-semibold flex space-x-2 items-center">
          <AiFillNotification className=" text-brand" />{' '}
          <span>Notifications</span>{' '}
        </h1>
        {isLoading ? (
          <div className="w-full h-[60vh] flex-container">
            <Loading w="10" h="10" />
          </div>
        ) : (
          <>
            {data && data.notifications.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-2 px-1 md:px-0">
                {data.notifications.map((notification: any, index: number) => (
                  <Link href={`/profile/${notification.user.username}`} className="h-20 w-full space-x-2 flex items-center justify-start  px-1 md:px-10 bg-[#1C1C1C]">
                    <div className=" h-[60px] w-[60px]    relative rounded-full text-white bg-white">
                      {' '}
                      <Image
                        src={notification.user.profile_pic}
                        alt=""
                        className="rounded-full"
                        fill
                        style={{ objectFit: 'cover' }}
                      />{' '}
                    </div>
                    <div className="flex flex-col flex-1 space-y-1 !capitalize">
                      <span className="!m-0 !p-0 text-xs max-w-full truncate">
                        {notification.message}
                      </span>
                      <div className="text-xs text-gray-500 truncate ">
                        {intlFormatDistance(new Date(notification.createdAt), new Date())}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="w-full col-container">
                <MdOutlineNotificationsOff className="w-[200px] h-[200px]" />
                <p className="text-xl text-brand  text-center  font-semibold">
                  Notifications will appear here when Ylvonis users follow you
                  and when they like, subscribe or playlist your music!.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Main>
  )
}

export default Notifications
