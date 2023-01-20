import { useState } from 'react'
import Image from 'next/image'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import Link from 'next/link'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { isMobile } from 'react-device-detect'

//
interface PlayListPropTypes {
  img?: string
  playListName: string
}

function PlayListCard(props: PlayListPropTypes) {
  const [favourited, setFavourited] = useState(false)
  return isMobile ? (
    <Link href={`/library/myplaylists/${props.playListName}`}>
      <div className="md:hidden w-full flex justify-between items-center border-b-[0.5px] border-solid border-utilGray py-4 px-1">
        <div className="w-1/4">
          <MdOutlinePlaylistPlay size={32} />
        </div>
        <div className="w-2/4 capitalize">
          <span>{props.playListName}</span>
        </div>
        <div className="w-1/4 ml-auto">
          <button
            className=" "
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setFavourited((prev) => !prev)
            }}
          >
            {favourited ? (
              <BsFillHeartFill size={30} className="text-brand  " />
            ) : (
              <BsHeart size={30} />
            )}
          </button>
        </div>
      </div>
    </Link>
  ) : (
    <Link href={`/library/myplaylists/${props.playListName}`}>
      <div className="relative h-[200px] w-full">
        <Image
          src={`/${props.img}`}
          fill
          alt="playlist image"
          className=" shadow-md w-full object-cover rounded-md"
        />
      </div>

      <div className="w-full capitalize truncate p-1 ">
        <span>{props.playListName}</span>
      </div>
    </Link>
  )
}

export default PlayListCard
