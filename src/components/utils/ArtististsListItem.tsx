import React, { useState } from 'react'
import Image from 'next/image'

function ArtististsListItem(props:{name:string,followers:string,following:number,img:string}) {
  const [following, setFollowing] = useState(props.following)
  return (
    // also used for users too
    <div>
      <nav className='flex gap-3 w-full items-center relative pb-1'>
        <div className='relative max-h-[50px] h-[50px]'>
          <Image src={`/${props.img}`} height={50} width={50} style={{objectFit:'contain'}} className='rounded' alt='' />
        </div>
      
        <div className='flex-col flex max-w-5/12'>
          <span className=' truncate font-semibold capitalize text-white'>{props.name }</span>
          <span className='text-utilGray capitalize text-xs'>{props.followers} followers</span>
        </div>
        <div className="ml-auto mr-5  flex  gap-2 cursor-pointer  text-utilGray">
          <button
            className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
            type="button"
            onClick={() => setFollowing((prev) => prev == 0 ? 1 : 0)}
          >
            {following === 0 ? 'followed' : 'follow +'}
          </button>
        </div>





      </nav>

    </div>
  )
}

export default ArtististsListItem