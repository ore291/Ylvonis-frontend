import React, { useState } from 'react'
import Image from 'next/image'
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '@/store/api/user'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function SuggestedPeopleCard({
  user,
}: {
  img?: string
  nation?: string
  name?: string
  following?: number
  user?: any
}) {
  const { data: session, status } = useSession()

  const [
    followUser,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowUserMutation()

  const [
    unFollowUser,
    { isLoading: unFollowingUser, isSuccess: unfollowed },
  ] = useUnFollowUserMutation()

  const handleFollow = (id: string) => {
    followUser(id)
    setFollowing(true)
  }

  const handleUnfollow = () => {
    unFollowUser(user.id)
    setFollowing(false)
  }
  const [following, setFollowing] = useState(false)

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

  return (
    <Link href={`/profile/${user.username}`}  className="!w-[150px] md:!w-full h-[200px]  border border-gray-50/20 rounded-lg shadow-md pb-2 ">
      <div className="relative w-full h-[100px] rounded-t-lg rounded-t-l ">
        <Image
          fill
          src={`${user.profile_pic}`}
          alt=""
          className="rounded-t-lg bg-white"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-1 text-center">
        <span className="text-lg capitalize font-bold tracking-tight truncate my-3 text-white">
          {user.firstname} {user.lastname}
        </span>
        <div className="flex-container space-x-1">
          <span className="text-sm text-center font-semibold text-utilGray !m-0 !p-0 capitalize ">
            {regionNames.of(user.location)}
          </span>
          <div className="relative w-6 h-4">
            <Image
              src={`https://countryflagsapi.com/png/${user.location}`}
              fill
              alt={user.username}
            />
          </div>
        </div>
        {status == 'authenticated' && (
          <div className="inline-flex items-center  mt-1">
            <button
              className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
              type="button"
              onClick={() => handleFollow(user._id)}
              disabled={followingUser}
            >
              {following ? 'followed' : 'follow +'}
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}

export default SuggestedPeopleCard
