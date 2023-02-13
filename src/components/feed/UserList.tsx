import { useGetDiscoveredUserQuery } from '@/store/api/user'
import React from 'react'
import ArtistsFeedItem from '../utils/ArtistsFeedItem'
import Loading from '../utils/Loading'
import UserFeedItem from './UserFeedItem'

const UserList = () => {
  const { data: users, isFetching, isLoading } = useGetDiscoveredUserQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  )
  return (
    <div className="min-h-full bg-bgGray max-h-[80vh] overflow-scroll pb-20">
      {isLoading ? (
        <div className="w-full h-20 flex-container">
          <Loading />
        </div>
      ) : users && users.length > 0 ? (
        users.map((user: any, index: number) => (
          <UserFeedItem user={user} key={index} />
        ))
      ) : (
        <div className="w-full flex-container">
          <span className="text-2xl my-2 font-semibold">No New Users</span>
        </div>
      )}
    </div>
  )
}

export default UserList
