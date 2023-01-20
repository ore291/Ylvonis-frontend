import React from 'react'
import Image from 'next/image'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import Link from 'next/link'
import { SlOptionsVertical } from 'react-icons/sl'


// 
interface SongPropTypes {
  img?: string
  songName: string
  artist:string
}


function SongCard(props: SongPropTypes) {
  return (
    <Link href={`/library/myplaylists/${props.songName}`}>
      <div className=''>
        {/* mobile playlist view */}
        <div className='md:hidden w-full flex justify-between items-center border-b-[0.5px] border-solid border-utilGray py-4 px-1'>
          <div className='w-1/4'>
            <BsMusicNoteBeamed size={32} />
          </div>
          <div className='w-2/4 capitalize flex-col flex'>
            <span>{props.songName}</span>
            <span className='text-sm text-utilGray'>{props.artist }</span>
          </div>
          <div className='w-1/4 ml-auto'>
            <div className='flex justify-end '>
              <SlOptionsVertical size={25} className='text-white' />
            </div>
          </div>
        </div>
        {/* desktop playlist view */}
        <div className='hidden md:block '>
          <div className="relative w-full h-[200px]">
             <Image src={`/${props.img}`} fill alt='playlist image'  className=' shadow-md object-cover  rounded-sm' />
          </div>
         

          <div className='capitalize truncate p-1 '>
            <span>{props.songName}</span>
          </div>
        </div>

      </div></Link>

  )
}

export default SongCard