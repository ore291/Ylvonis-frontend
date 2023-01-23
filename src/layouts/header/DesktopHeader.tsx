import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { ProfileDropdown } from './ProfileDropdown'
import { NotificationDropdown } from './NotificationDropdown'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function DesktopHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)
 


  const notifications = [
    {
      type: 'album',
      img: '/beats.png',
      artist: 'ckay',
      title: 'yes i need you',
      date: new Date(),
    },
    {
      type: 'album',
      img: '/beats.png',
      artist: 'ckay',
      title: 'yes i need you',
      date: new Date(),
    },
    {
      type: 'album',
      img: '/erik.jpg',
      artist: 'Ruga',
      title: 'NOW',
      date: new Date(),
    },
    {
      type: 'song',
      img: '/cool.png',
      artist: 'Victony',
      title: 'antisocial',
      date: new Date(),
    },
    {
      type: 'song',
      img: '/austin.jpg',
      artist: 'rare americans',
      title: 'run the world',
      date: new Date(),
    },
  ]
  const { data: session, status } = useSession();

 

  return (
    <nav className="hidden container md:flex flex-row h-[80px] border-b border-[#343434]">
      <Link
        href="/"
        className="flex items-center justify-center space-x-2 basis-1/6"
      >
        <Image
          src="/logo.svg"
          width={42}
          height={42}
          className=" rounded-full object-cover"
          alt=""
        />
        <h1 className="gradText font-semibold text-3xl">Ylvonis</h1>
      </Link>

      <div className="flex justify-between items-center  basis-5/6 px-7">
        <div className=" flex items-center px-2 border-[0.5px] bg-[#202020] border-bgGray rounded-full">
          <button type="submit">
            <BiSearchAlt size={20} className="" />
          </button>

          <input
            type="search"
            name=""
            id=""
            autoFocus
            placeholder="Search"
            className="bg-transparent placeholder:text-white  w-[400px] outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-full   h-full !text-white focus:border-0  border-0  "
          />
        </div>
        <div className="flex items-center space-x-6">
          <div className=" ">
            <NotificationDropdown notifications={notifications} />
          </div>
          <div className="ml-auto ">
            {status !== "unauthenticated"  ? (
              <ProfileDropdown user={session?.user} />
            ) : (
              <div className="flex space-x-3  h-8">
                <button className="gradButton rounded  px-2  block !text-sm  capitalize">
                  <Link href={'/login'}>Login</Link>
                </button>
                <button className="bg-transparent capitalize mr-2 border-purple-600 border-solid border-2 px-1   !text-sm rounded">
                  <Link href={'/register'}>Register</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DesktopHeader
