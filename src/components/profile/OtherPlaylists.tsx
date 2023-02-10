import Loading from '../utils/Loading'
import { useState } from 'react'
import { BsListUl, BsPlus } from 'react-icons/bs'
import PlayListCard from '../library/Myplaylist/PlayListCard'

export default function OtherPlaylists({ playlists }: { playlists: any }) {
  return (
    <main className="">
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
        {/* <div className="py-2 flex gap-4 px-4 md:py-4 items-center border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <button
            className="btn btn-block gradButton p-2 text-xl rounded-md"
            // onClick={() => setShowAddNew((prev) => !prev)}
          >
            <BsPlus size={35} />
          </button>
          <h1>Add new playlist</h1>
        </div> */}
      </section>

      <section className="">
        {playlists.length === 0 ? (
          <header className="text-xl text-center  w-full mt-2 text-bold">
            No Playlists Found
          </header>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4">
            {playlists?.map((playlist: any) => (
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
    </main>
  )
}
