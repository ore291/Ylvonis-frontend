import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { artistAPi, useFollowArtistMutation } from '@/store/api/artist'
import { useSession } from 'next-auth/react'
import { useFollowUserMutation, useUnFollowUserMutation } from '@/store/api/user'
import Loading from '../utils/Loading'

function UserFeedItem({
  user,
}: {
  name?: string
  followers?: string
  following?: number
  img?: string
  user?: any
}) {
  const { data: session } = useSession()
  const [following, setFollowing] = useState(
    user.followers.includes(session?.user.id),
  )

  const [
    followUser,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowUserMutation()

  const [
    unFollowUser,
    { isLoading: unFollowingUser, isSuccess: unfollowed },
  ] = useUnFollowUserMutation()

  useEffect(() => {
    setFollowing(user.followers.includes(session?.user.id))
  }, [])



  useEffect(() => {
    if (!followed) return
    setFollowing(true)
  }, [followed])

  useEffect(() => {
    if (!unfollowed) return
    setFollowing(false)
  }, [unfollowed])

  return (
    // also used for users too
    <>
      {/* mobile view */}
      <div className="">
        <nav className="flex gap-3 w-full items-center relative pb-1">
          <div className="relative max-h-[50px] h-[50px] rounded bg-white">
            <Image
              src={user?.profile_pic}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
              className="rounded"
              alt=""
            />
          </div>

          <div className="flex-col flex max-w-5/12">
            <span className=" truncate font-semibold capitalize text-white">
              {user.username}
            </span>
            <span className="text-utilGray capitalize text-xs">
              {user.followers.length} followers
            </span>
          </div>
          <div className="ml-auto mr-5  flex  gap-2 cursor-pointer  text-utilGray">
          {following ? (
              <button
                className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
                type="button"
                onClick={() => unFollowUser(user._id)}
                disabled={unFollowingUser}
              >
                {unFollowingUser ? <Loading w="3" h="3" /> : 'followed'}
              </button>
            ) : (
              <button
                className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
                type="button"
                onClick={() => followUser(user._id)}
                disabled={followingUser}
              >
                {followingUser ? <Loading w="3" h="3" /> : 'follow +'}
              </button>
            )}
            
          </div>
        </nav>
      </div>

      {/* desktop view */}
    </>
  )
}

export default UserFeedItem
