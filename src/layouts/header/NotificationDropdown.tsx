import React from 'react'
import { SlBell } from 'react-icons/sl'
import { SlOptionsVertical } from 'react-icons/sl'
import Link from 'next/link';
import Image from 'next/image'
import { BsBellFill, BsFillBellFill } from 'react-icons/bs';

interface NotificationTypes{
  type?: string
  img: string
  userImages?:Object
  artist?: string
  title?: string
  date?:any
  
}

export  const NotificationDropdown = (props:{notifications?:NotificationTypes[]})=> {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  

  const notifications = props.notifications

  return (
    <div className="relative">
      <button id="dropdownNotificationButton" onClick={() => setDropDownOpen((prev) => !prev)} className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
        <BsFillBellFill className="text-white h-8 w-8"  />
    <div className="relative flex">
      <div className="relative inline-flex w-2 h-2 bg-red-500  rounded-full -top-2 right-2 dark:border-gray-900" />
    </div>
  </button>
  {/* Dropdown menu */}
      <div id="dropdownNotification" className={`z-50 ${dropDownOpen ? "absolute" : "hidden"
          } bg-bgGray w-80   top-9  -right-32   rounded shadow`} >
    <div className="py-3 px-4  font-medium text-sm text-start ">
      Notifications
    </div>
        <div className="col-container  max-h-[52vh] overflow-scroll">
          {/*  */}
          {notifications?.map((notification,index) => (
            <div className="flex px-4 py-3 w-full " key={index}>
              <div className="col-container w-4/12">
                <div className=" h-3/4 w-full mr- ml- my-auto relative rounded text-white bg-gray-700">
                  {" "}
                  <Image
                    src={notification.img }
                    alt=""
                    className="rounded"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

              </div>
              <div className="w-full pl-3 flex flex-col !capitalize">
                <span className="text-gray-500 text-xs  ">{notification.type} </span>
                <span className='!m-0 !p-0 '>{notification.title }</span>
                <span className="text-gray-500 text-xs  ">{ notification.artist}</span>

              </div>
              <div className='flex-col flex justify-between'>
                <div className='ml-auto'>
                  <SlOptionsVertical size={10} className='rotate-90' />
                </div>
                <div className='text-xs text-gray-500 truncate '>
                  {notification.date.toDateString()}
                </div>
              </div>
            </div>
      ))}


     
    </div>
    <Link href="/notifications" className="block  py-2 text-sm font-medium text-center text-white">
      <div className="inline-flex items-center ">
        
        View all
      </div>
    </Link>
  </div>
</div>

  )
}

