import React, { useState } from "react";
import Image from "next/image";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

function ArtististsListItem(props: {
  name: string;
  followers: string;
  following: number;
  img: string;
}) {
  const [following, setFollowing] = useState(props.following);
  const [favourited, setFavourited] = useState(false)
  return (
    // also used for users too
    <>
      {/* mobile view */}
      <div className="md:hidden">
        <nav className="flex gap-3 w-full items-center relative pb-1">
          <div className="relative max-h-[50px] h-[50px]">
            <Image
              src={`/${props.img}`}
              height={50}
              width={50}
              style={{ objectFit: "contain" }}
              className="rounded"
              alt=""
            />
          </div>

          <div className="flex-col flex max-w-5/12">
            <span className=" truncate font-semibold capitalize text-white">
              {props.name}
            </span>
            <span className="text-utilGray capitalize text-xs">
              {props.followers} followers
            </span>
          </div>
          <div className="ml-auto mr-5  flex  gap-2 cursor-pointer  text-utilGray">
            <button
              className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
              type="button"
              onClick={() => setFollowing((prev) => (prev == 0 ? 1 : 0))}
            >
              {following === 0 ? "followed" : "follow +"}
            </button>
          </div>
        </nav>
      </div>

      {/* desktop view */}
      <div className="m-1 my-2 hidden md:block w-auto relative">
        <div className='hidden md:block w-auto relative'>
          <div className="absolute right-12 z-40 top-[1.5px] bg-black  w-9 h-9 flex items-center justify-center rounded-full ">
            <button className=' ' onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setFavourited((prev) => !prev)
            }}>
              {favourited ? <BsFillHeartFill size={20} className='text-purple-500  ' /> : <BsHeart size={20} />}

            </button>
          </div>
          <Image src={`/${props.img}`} alt='playlist image' height={130} width={150} className='!relative shadow-md max-w-[150px] max-h-[130px] object-contai rounded-md' />

          <div className='w-10/12 my-0.5 p-1 flex justify-between'>
            <span className=" capitalize truncate">{props.name}</span>
            <div className="cursor-pointer"><SlOptionsVertical size={20} /></div>
          </div>
          <p className=" font-semibold text-utilGray !m-0 !p-0 capitalize text-sm">{props.followers} followers</p>
        </div>
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
    </>
  );
}

export default ArtististsListItem;
