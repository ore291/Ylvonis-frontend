import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

//i think this should be all the type it needs
interface SongCardProps{
  img: string
  songTitle:string
  artist:string


}


// you can help me and fix the css for this card ,i don't think it looks picasso 
function SongCard(props:SongCardProps) {
  return (
    <div className='bg-transparent relative max-h-56 w-28'>
      <Link href={''}></Link>
      <div className='card-img relative h-32 w-28'>
        {/*  */}
        {/* <div className="relative"> <Image src="/logo.svg" width={15} height={30} className=' rounded-full absolute  top-1 left-1 z-10 object-contain' alt='' /></div>    */}
        <Image src={`/${props.img}`} alt='song image' fill className=' shadow-md object-cover h-28 rounded-md' />
      </div>
    
      <div className='flex gap-0 flex-col capitalize mt-1'>
        <span className='font-semibold text-lg ml-0.5 max-w-[90%] truncate '>{props.songTitle}</span>
        <span className='text-xs max-w-[90%] truncate '>{props.artist}</span>
      </div>

    </div>
  )
}

export default SongCard