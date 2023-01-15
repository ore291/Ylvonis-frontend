import React from 'react'
import { ActiveLink } from './footer'
import { RoutesType } from "@/components/library/mainpage";
import { BsNewspaper, BsChat } from 'react-icons/bs';
import {  MdOutlinePlaylistPlay } from 'react-icons/md';
import { TbPlaylist } from 'react-icons/tb';
import { TiHome } from 'react-icons/ti';
import { FaUserCheck } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
function Sidebar() {

  const libraryRoutes = [
      {
      title: 'my playlist',
      icon: <MdOutlinePlaylistPlay size={32} />,
      link: '/library/myplaylists'
    },
    {
      title: 'song library',
      icon: <IoLibrary size={30} />,
      link: '/library/songlibrary'
    },
    {
      title: 'artists',
      icon: <FaUserCheck size={30} />,
      link: '/library/artists'
    }
]
  const routes: RoutesType[] = [

    {
      title: 'Home',
      icon: <TiHome size={30} className="mx-auto" />,
      link: '/'
    },
    {
      title: 'feed',
      icon: <BsNewspaper size={30} className="mx-auto" />,
      link: '/feed'
    },
    {
      title: 'chat',
      icon: <BsChat size={30} className="mx-auto" />,
      link: '/chat'
    },
    {
      title: 'listen',
      icon: <TbPlaylist size={30} className='mx-auto' />,
      link: '/listen'
    },
    






  ]
  return (

  <aside className=" mr-auto hidden md:block col-span-1 w-52 border-r-[0.5px] border-gray-700 left-0 " aria-label="Sidebar">
  <div className="px-3 py-4 overflow-y-auto rounded  ">
        <ul className="flex flex-col  p-5">
          {routes.map((route: RoutesType, index: number) => (
            <li key={index}>
              <ActiveLink href={route.link}>
                <div className="flex items-center p-2 capitalize text-base font-normal  rounded-lg ">
                  {route.icon}
                  <span className="ml-3">{route.title}</span>
                </div>

               
              </ActiveLink>
            </li>
          ))}
          <li >
            <div>
              <div className="flex items-center p-2 mt-2 text-base font-normal  rounded-lg text-gray-700 ">
                
                <span className="ml- text-lg ">Library</span>
              </div>


            </div>
          </li>
          {libraryRoutes.map((route: RoutesType, index: number) => (
            <li key={index}>
              <ActiveLink href={route.link}>
                <div className="flex items-center p-2 capitalize text-base font-normal  rounded-lg ">
                  {route.icon}
                  <span className="ml-3 whitespace-nowrap">{route.title}</span>
                </div>


              </ActiveLink>
            </li>
          ))}

    </ul>
  </div>
</aside>


  )
}

export default Sidebar