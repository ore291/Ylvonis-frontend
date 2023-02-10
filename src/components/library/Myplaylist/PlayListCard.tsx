import { useState } from 'react'
import Image from 'next/image'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import Link from 'next/link'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { isMobile } from 'react-device-detect'

//
interface PlayListPropTypes {
  id: string
  img?: string
  playListName: string
}

function PlayListCard(props: PlayListPropTypes) {
  const [favourited, setFavourited] = useState(false)
  return isMobile ? (
    <Link href={`/playlists/${props.id}`}>
      <div className="md:hidden w-full flex justify-start space-x-2 items-center border-b-[0.5px] border-solid border-utilGray py-4 px-1">
        <div className="">
          <MdOutlinePlaylistPlay size={40} />
        </div>
        <div className="text-lg font-semibold capitalize">
          <span>{props.playListName}</span>
        </div>
      </div>
    </Link>
  ) : (
    <Link href={`/playlists/${props.id}`}>
      <div className="relative h-[200px] w-full">
        <Image
          src={props?.img}
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
