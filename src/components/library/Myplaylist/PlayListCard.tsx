import { useState} from 'react'
import Image from 'next/image'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import Link from 'next/link'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'


// 
interface PlayListPropTypes{
  img?: string
  playListName: string
}


function PlayListCard(props: PlayListPropTypes) {
  const [favourited, setFavourited] = useState(false)
  return (
    <Link href={`/library/myplaylists/${props.playListName}`}>
      <div className=''>
        {/* mobile playlist view */}
        <div className='md:hidden w-full flex justify-between items-center border-b-[0.5px] border-solid border-utilGray py-4 px-1'>
          <div className='w-1/4'>
            <MdOutlinePlaylistPlay size={32} />
          </div>
          <div className='w-2/4 capitalize'>
            <span>{props.playListName}</span>
          </div>
          <div className='w-1/4 ml-auto'>
            <button className=' ' onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setFavourited((prev) => !prev)
            }}>
              {favourited ? <BsFillHeartFill size={30} className='text-purple-500  ' /> : <BsHeart size={30} />}

            </button>
          </div>
        </div>
        {/* desktop playlist view */}
        <div className='hidden md:block w-auto'>
          <Image src={`/${props.img}`} alt='playlist image' height={130} width={130} className='!relative shadow-md w-[130px] h-[130px] object-contai rounded-md' />

          <div className='w-3/4 capitalize truncate p-1 '>
            <span>{props.playListName}</span>
          </div>
        </div>

      </div></Link>

  )
}

export default PlayListCard