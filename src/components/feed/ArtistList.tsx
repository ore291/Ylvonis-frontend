import { useGetArtistsQuery } from '@/store/api/artist'
import React from 'react'
import ArtistsFeedItem from '../utils/ArtistsFeedItem'
import Loading from '../utils/Loading'

const ArtistList = () => {
  const { data: artists, isFetching, isLoading } = useGetArtistsQuery(10, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })
  return (
    <div className="min-h-full bg-bgGray max-h-[80vh] overflow-scroll pb-20">
      {isLoading ? (
        <div className="w-full h-20 flex-container">
          <Loading />
        </div>
      ) : artists && artists.length > 0 ? (
        artists.map((artist: any, index: number) => (
          <ArtistsFeedItem artist={artist} key={index} />
        ))
      ) : (
        <div className="w-full flex-container">
          <span className="text-2xl my-2 font-semibold">No New Artists</span>
        </div>
      )}
    </div>
  )
}

export default ArtistList
