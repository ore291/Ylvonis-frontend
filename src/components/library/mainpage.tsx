import { MdOutlinePlaylistPlay } from 'react-icons/md'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { IoLibrary } from 'react-icons/io5'
import {FaUserCheck} from 'react-icons/fa'
import Link from 'next/link'


export type RoutesType = {
  title: string,
  icon: JSX.Element
  link: string
  activeIcon?: JSX.Element
}

function MainPage() {
  const routes: RoutesType[] = [
    {
    title: 'my playlist',
    icon: <MdOutlinePlaylistPlay size={32} />,
    link:'/library/myplaylists'
  },
    {
      title: 'song library',
      icon: <IoLibrary size={28} />,
      link: '/library/songlibrary'
    },
    {
      title: 'artists',
      icon: <FaUserCheck size={30} />,
      link: '/library/artists'
    }]
  return (
    <div className='w-full md:hidden'>
      {routes.map((route:RoutesType,index:number) => (
        <Link href={route.link} key={index}>
          <div className='flex w-full border-y justify-between items-center border-solid border-slate-700'>
            <div className='flex gap-3 items-center text-white w-5/12'>
              {route.icon}
              
              <p className='text-white font-bold capitalize'>{route.title}</p>

            </div>
            <div className='text-utilGray'>
              <HiOutlineChevronRight size={30} />
            </div>
          </div>
        </Link>
     ))}
    </div>
  )
}

export default MainPage