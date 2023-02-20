import Loading from '@/components/utils/Loading'
import { useGetUserSubscribedPlaylistQuery } from '@/store/api/song'
import { useState } from 'react'
import { BsListUl, BsPlus } from 'react-icons/bs'
import dynamic from 'next/dynamic'

const AddNew = dynamic(() => import('./AddNew'), { ssr: false })
import PlayListCard from './PlayListCard'

function SubscribedPlaylists() {
  const {
    data,
    error,
    isLoading,
    isSuccess,
  } = useGetUserSubscribedPlaylistQuery(null)

  return (
    <main>
      <section>
        <nav className="flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">
            {data && data?.playlists ? data?.playlists?.length : 0} playlists
          </div>
          <button>
            {' '}
            <BsListUl size={30} className="text-utilGray" />{' '}
          </button>
        </nav>
      </section>
      {isLoading ? (
        <Loading w="10" h="10" />
      ) : (
        <section className="">
          {data && data.playlists.length === 0 ? (
            <header className="text-xl text-center  w-full mt-2 text-bold">
              No Playlists Found
            </header>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4">
              {data &&
                data.playlists?.map((playlist: any) => (
                  <div key={playlist.id}>
                    <PlayListCard
                      id={playlist?.id}
                      img={playlist?.coverArt}
                      playListName={playlist?.name}
                    />
                  </div>
                ))}{' '}
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default SubscribedPlaylists
