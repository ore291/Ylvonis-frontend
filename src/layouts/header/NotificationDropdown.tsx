import React from 'react'
import { SlBell } from 'react-icons/sl'
import Image from 'next/image'
import Link from 'next/link';


export  const NotificationDropdown = ()=> {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  return (
    <div className="relative">
      <button id="dropdownNotificationButton" onClick={() => setDropDownOpen((prev) => !prev)} className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
        <SlBell className="text-white" size={"28px"} />
    <div className="relative flex">
      <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900" />
    </div>
  </button>
  {/* Dropdown menu */}
      <div id="dropdownNotification" className={`z-50 ${dropDownOpen ? "absolute" : "hidden"
          } bg-bgGray w-80   top-9  -right-32   rounded shadow max-h-[60vh] overflow-scroll`} >
    <div className="py-3 px-4  font-medium text-sm text-start ">
      Notifications
    </div>
    <div className="">
      <a href="#" className="flex px-4 py-3 ">
        <div className="flex-shrink-0">
              <div className="w-6 h-6 mr-2 ml-2 relative rounded-full text-white bg-gray-700">
                {" "}
                {/* <Image
                  src={user?.profileImg}
                  alt=""
                  className="rounded-full"
                  fill
                  style={{ objectFit: "contain" }}
                /> */}
              </div>

        </div>
        <div className="w-full pl-3">
          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
        </div>
      </a>


     
    </div>
    <Link href="/notifications" className="block  py-2 text-sm font-medium text-center text-white">
      <div className="inline-flex items-center gradButton">
        
        View all
      </div>
    </Link>
  </div>
</div>

  )
}

