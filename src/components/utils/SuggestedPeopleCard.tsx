import React, { useState } from 'react'
import Image from 'next/image'


function SuggestedPeopleCard(props: { img: string, nation?: string, name: string, following: number }) {
  const [following, setFollowing] = useState(props.following)
  return (

   <div className="!w-[150px] max-h-[190px]  border border-gray-200 rounded-lg shadow-md ">
      <div className='relative w-full h-[100px] rounded-t-lg rounded-t-l '>
        <Image className="" fill src={`/${props.img}` } alt='' style={{objectFit:'cover'}}/>
  </div>
  <div className="p-1 text-center">
  
          <span className="text-lg capitalize font-bold tracking-tight truncate my-3 text-white">{props.name }</span>
 
        <p className=" font-semibold text-utilGray !m-0 !p-0 capitalize ">{props.nation }</p>
    <div className="inline-flex items-center  mt-1">
          <button
            className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
            type="button"
            onClick={() => setFollowing((prev) => prev == 0 ? 1 : 0)}
          >
            {following === 0 ? 'followed' : 'follow +'}
          </button>
     
    </div>
  </div>
</div>


  )
}

export default SuggestedPeopleCard