import React from 'react'
import Image from 'next/image'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Button } from '../UI'
const SongCard = () => {
  return (
    <div className="w-full h-[90px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
      <div className="basis-1/5 relative w-full h-full rounded-md">
        <Image fill alt="" src="/image 2.png"  className="object-cover" />
      </div>
      <div className="basis-4/5 flex items-center justify-between px-1">
        <div className="flex flex-col justify-center space-y-2">
          <p className="text-lg font-semibold text-white">Todo Seu</p>
          <span className="text-sm text-utilGray">JORGE ft Mateus</span>
        </div>
        <Button variant='naked' size="slim">
              <BsThreeDotsVertical className='text-white w-7 h-7 '/>
        </Button>
    
      </div>
    </div>
  )
}

export default SongCard
