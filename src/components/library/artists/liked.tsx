import ArtistsCard from '@/components/utils/ArtistsCard'
import Loading from '@/components/utils/Loading'
import { useGetLikedArtistsQuery } from '@/store/api/artist'
import React from 'react'
import { BsListUl } from 'react-icons/bs'

function LikedArtists() {
  const { data: artists, isFetching, isLoading } = useGetLikedArtistsQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  )
  return (
    <main>
      <section>
        <nav className="flex w-full justify-between p-4 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">
            {artists ? artists.length : 0} artists{' '}
          </div>
          <button>
            {' '}
            <BsListUl size={30} className="text-utilGray" />{' '}
          </button>
        </nav>
      </section>
      <section className=" mt-2 mb-10 p-2">
        {isLoading ? (
          <div className="w-full h-[60vh] flex-container">
            <Loading w="6" h="6" />
          </div>
        ) : artists && artists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {artists.map((artist: any, index: number) => (
              <ArtistsCard artist={artist} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-xl font-medium text-center">No Liked Artist Found</p>
        )}
      </section>
    </main>
  )
}

export default LikedArtists
