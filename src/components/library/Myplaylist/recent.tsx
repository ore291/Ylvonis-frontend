import Loading from '@/components/utils/Loading'
import { useGetUserPlaylistQuery } from '@/store/api/song'
import { useState } from 'react'
import { BsListUl, BsPlus } from 'react-icons/bs'
import PlayListCard from './PlayListCard'
import dynamic from 'next/dynamic'

const AddNew = dynamic( () => import('./AddNew'), { ssr: false } )

export default function RecentPlayLists() {
  const {
    data: playlists,
    error,
    isLoading,
    isSuccess,
  } = useGetUserPlaylistQuery(null)


  const [showAddNew, setShowAddNew] = useState(false)
  return (
    <main className="">
      <AddNew show={showAddNew} setShow={setShowAddNew} />
      <section>
        <nav className="flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">
            {playlists && playlists.length} playlists
          </div>
          <button>
            {' '}
            <BsListUl size={30} className="text-utilGray" />{' '}
          </button>
        </nav>
        <div className="py-2 flex gap-4 px-4 md:py-4 items-center border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <button
            className="btn btn-block gradButton p-2 text-xl rounded-md"
            onClick={() => setShowAddNew((prev) => !prev)}
          >
            <BsPlus size={35} />
          </button>
          <h1>Add new playlist</h1>
        </div>
      </section>
      {isLoading ? (
        <Loading w="10" h="10" />
      ) : (
        <section className="">
          {playlists && playlists.length === 0 ? (
            <header className="text-xl text-center  w-full mt-2 text-bold">
              No Playlists Found
            </header>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4">
              {playlists && playlists?.map((playlist: any) => (
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
