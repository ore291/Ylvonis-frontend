import React, { useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'
import Image from 'next/image'

function ArtistsCard(props: {
  name: string
  followers: string
  following: number
  img: string
}) {
  const [following, setFollowing] = useState(props.following)
  const [favourited, setFavourited] = useState(false)
  return (
    <div className="">
      <div className=" relative">
        <div className="absolute right-2 z-10 top-[1.5px] bg-black  w-9 h-9 flex items-center justify-center rounded-full ">
          <button
            className=" "
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setFavourited((prev) => !prev)
            }}
          >
            {favourited ? (
              <BsFillHeartFill size={20} className="text-brand  " />
            ) : (
              <BsHeart size={20} />
            )}
          </button>
        </div>
        <div className="relative w-full h-[150px] md:h-[200px]">
          <Image
            src={`/${props.img}`}
            alt="playlist image"
            fill
            className="!relative shadow-md  object-cover rounded-md"
          />
        </div>

        <div className="w-full my-0.5 p-1 flex justify-between items-center">
          <span className=" capitalize truncate">{props.name}</span>
          <div className="cursor-pointer">
            <SlOptionsVertical size={16} />
          </div>
        </div>
        <p className=" font-semibold text-utilGray !m-0 !p-0 capitalize text-sm">
          {props.followers} followers
        </p>
      </div>
      <div className="inline-flex items-center  mt-1">
        <button
          className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
          type="button"
          onClick={() => setFollowing((prev) => (prev == 0 ? 1 : 0))}
        >
          {following === 0 ? 'followed' : 'follow +'}
        </button>
      </div>
    </div>
  )
}

export default ArtistsCard
