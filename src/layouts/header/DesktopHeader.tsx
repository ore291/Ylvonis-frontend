import React, {useState, useRef, FormEvent} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { ProfileDropdown } from './ProfileDropdown'
import { NotificationDropdown } from './NotificationDropdown'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { RiUploadCloud2Fill } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router'
import { searchDb } from '@/store/slices/search'
import { useSearchQuery } from '@/store/api/search'

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
  const { data: session, status } = useSession()




  const dispatch = useAppDispatch();

  const [input, setInput] = useState("")

  const router = useRouter()

  const path = router.pathname;
  const search = useAppSelector(state => state.search.title)

  const handleSearch  = (e : FormEvent ) =>{
    e.preventDefault()
    router.push(`/search?q=${search}`)
  }



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
        <form onSubmit={(e)=>handleSearch(e)} className=" flex items-center px-2 border-[0.5px] bg-[#202020] border-bgGray rounded-full">
          <button type="submit">
            <BiSearchAlt size={20} className="" />
          </button>
 
          <input
          value={search}
            onChange={(e)=>dispatch(searchDb(e.currentTarget.value))}
            type="search"
            name=""
            id=""
            autoFocus
            placeholder="Search for artists, songs and albums"
            className="bg-transparent placeholder:text-gray-500 placeholder:text-xs  w-[400px] outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-full   h-full !text-white focus:border-0  border-0  "
          />
        </form>
        <div className="flex items-center space-x-3">
          {status !== 'unauthenticated' && (
            <>
              {' '}
              <div className=" ">
                <NotificationDropdown notifications={notifications} />
              </div>
              <div className=" ">
                <Link href={'/upload'}>
                  <div className="w-24 h-8 rounded-full bg-brand flex items-center justify-center space-x-1">
                    <RiUploadCloud2Fill />
                    <span className="text-xs font-semibold">Upload</span>
                  </div>
                </Link>
              </div>
            </>
          )}

          <div className="ml-auto ">
            {status !== 'unauthenticated' ? (
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
