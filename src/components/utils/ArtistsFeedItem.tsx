import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { artistAPi, useFollowArtistMutation } from '@/store/api/artist'
import { useSession } from 'next-auth/react'

function ArtistsFeedItem({
  artist,
}: {
  name?: string
  followers?: string
  following?: number
  img?: string
  artist?: any
}) {
  const { data: session } = useSession()
  const [following, setFollowing] = useState(
    artist.followers.includes(session?.user.id),
  )

  const [
    followArtist,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowArtistMutation()

  useEffect(() => {
    setFollowing(artist.followers.includes(session?.user.id))
  }, [])



  const toggleFollow = () => {
    followArtist(artist._id)
    setFollowing(!following)
  }

  return (
    // also used for users too
    <>
      {/* mobile view */}
      <div className="">
        <nav className="flex gap-3 w-full items-center relative pb-1">
          <div className="relative max-h-[50px] h-[50px] rounded bg-white">
            <Image
              src={artist?.photo}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
              className="rounded"
              alt=""
            />
          </div>

          <div className="flex-col flex max-w-5/12">
            <span className=" truncate font-semibold capitalize text-white">
              {artist.stageName}
            </span>
            <span className="text-utilGray capitalize text-xs">
              {artist.followers.length} followers
            </span>
          </div>
          <div className="ml-auto mr-5  flex  gap-2 cursor-pointer  text-utilGray">
            <button
              className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
              type="button"
              onClick={() => toggleFollow()}
              disabled={followingUser}
            >
              {following ? 'followed' : 'follow +'}
            </button>
          </div>
        </nav>
      </div>

      {/* desktop view */}
    </>
  )
}

export default ArtistsFeedItem
