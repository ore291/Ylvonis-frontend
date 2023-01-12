import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SongCardProps{
  img: string
  songTitle:string
  artist:string


}



function SongCard(props:SongCardProps) {
  return (
    <div className='bg-transparent relative h-56 w-32'>
      <Link href={''}></Link>
      <div className='card-img relative'>
        {/* <div className="relative"> <Image src="/logo.svg" width={15} height={30} className=' rounded-full absolute  top-1 left-1 z-10 object-contain' alt='' /></div>    */}
        <Image src={`/${props.img}`} alt='song image' height={130} width={130} className='!relative shadow-md w-[130px] h-[130px] object-contai rounded-md' />
      </div>
    
      <div className='flex gap-0 flex-col capitalize mt-1'>
        <span className='font-semibold text-lg ml-0.5 max-w-[90%] truncate '>{props.songTitle}</span>
        <span className='text-xs max-w-[90%] truncate '>{props.artist}</span>
      </div>

    </div>
  )
}

export default SongCard