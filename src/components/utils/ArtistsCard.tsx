import React, { useEffect, useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {
  useFollowArtistMutation,
  useLikeArtistMutation,
} from '@/store/api/artist'

function ArtistsCard({ artist }: { artist?: any }) {
  const { data: session } = useSession()
  const [following, setFollowing] = useState(
    artist.followers.includes(session?.user.id),
  )
  const [liked, setLiked] = useState(artist.likes.includes(session?.user.id))

  const [
    followArtist,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowArtistMutation()

  useEffect(() => {
    setFollowing(artist.followers.includes(session?.user.id))
  }, [])

  const [
    likeArtist,
    { isLoading: liking, isSuccess: likeSuccess },
  ] = useLikeArtistMutation()

  useEffect(() => {
    setFollowing(artist.followers.includes(session?.user.id))
  }, [])

  const toggleFollow = () => {
    followArtist(artist._id)
    setFollowing(!following)
  }

  const toggleLike = () => {
    likeArtist(artist._id)
    setLiked(!liked)
  }

  return (
    <div className="">
      <div className="relative w-full rounded bg-white h-[150px] md:h-[200px]">
        <div className="absolute right-2 z-10 top-[1.5px] bg-black  w-9 h-9 flex items-center justify-center rounded-full ">
          <button className=" " onClick={() => toggleLike()}>
            {liked ? (
              <BsFillHeartFill size={20} className="text-brand  " />
            ) : (
              <BsHeart size={20} />
            )}
          </button>
        </div>
        <Image
          src={artist.photo}
          alt="playlist image"
          fill
          className=" shadow-md  object-cover rounded-md"
        />
      </div>

      <div className="w-full my-0.5 p-1 flex justify-between items-center">
        <span className=" capitalize truncate max-w-[80%]">
          {artist.stageName}
        </span>
        <div className="cursor-pointer">
          <SlOptionsVertical size={16} />
        </div>
      </div>
      <div className="w-full my-0.5 p-1 flex justify-between items-center">
        <p className=" font-semibold text-utilGray !m-0 !p-0 capitalize text-sm">
          {artist.followers.length} followers
        </p>

        <button
          className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
          type="button"
          disabled={followingUser}
          onClick={() => toggleFollow()}
        >
          {following ? 'followed' : 'follow +'}
        </button>
      </div>
    </div>
  )
}

export default ArtistsCard
