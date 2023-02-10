import React, { FormEvent, useState } from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { BiSearchAlt } from 'react-icons/bi'
import { searchDb } from '@/store/slices/search'
import { useSearchQuery } from '@/store/api/search'
import Loading from '@/components/utils/Loading'
import player, { usePlayerState } from '@/lib/player'
import SongCard from '@/components/library/SongLibrary/SongCard'
import PlayListCard from '@/components/library/Myplaylist/PlayListCard'
import SuggestedPeopleCard from '@/components/utils/SuggestedPeopleCard'

function SearchResults() {
  const router = useRouter()
  const search = useAppSelector((state) => state.search.title)
  const [input, setInput] = useState('')
  const dispatch = useAppDispatch()

  const { data: searchResults, isLoading, isSuccess, refetch } =
    useSearchQuery(search, {
      skip: search === '',
      refetchOnMountOrArgChange: false,
    }) || {}

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    dispatch(searchDb(input))
    router.push(`/search?q=${input}`)
  }

  const state = usePlayerState()

  const PlayTrack = (index: number) => {
    if (state.playing && index === state.currentTrackIndex) {
      player.pause()
    } else if (index !== state.currentTrackIndex) {
      player.playTrack(index)
      player.play()
    } else {
      player.play()
    }
  }

  const setQueue = (index?: number) => {
    if (index) {
      player.setQueue(
        {
          id: 'search-songs',
          title: 'search-songs',
          imageUrl: '',
          tracks: searchResults.songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: 'search-songs',
          title: 'search-songs',
          imageUrl: '',
          tracks: searchResults.songs,
        },
        0,
      )
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== 'search-songs') {
      // set Queue
      setQueue(index)
      player.play()
      return
    } else {
      // handle play
      PlayTrack(index || 0)
    }
  }

  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Search"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#1c1c1c] p-2 md:p-10 flex flex-col space-y-5 md:space-y-10 items-senter jutify-center">
          <div className="w-full flex-container">
            {router.query.q && (
              <h2 className="text-2xl font-semibold">
                Results Matching{' '}
                <span className="text-brand">{`"${
                  router.query.q ? router.query.q : ''
                }"`}</span>
              </h2>
            )}
          </div>
          <form
            onSubmit={(e) => handleSearch(e)}
            className=" flex items-center p-2 border-[0.5px] bg-[#333333] border-bgGray "
          >
            <button type="submit">
              <BiSearchAlt size={20} className="text-brand fill-brand" />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              type="search"
              name=""
              id=""
              autoFocus
              placeholder="Search for artists, songs and albums"
              className="bg-transparent placeholder:text-gray-500 placeholder:text-xs  flex-1 outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-full   h-full !text-white focus:border-0  border-0  "
            />
          </form>
        </div>
        <div className="my-4">
          {isLoading ? (
            <div className="w-full h-[60vh]">
              <Loading w="8" h="8" />
            </div>
          ) : (
            <div className="flex flex-col  gap-y-4">
              {searchResults && searchResults?.songs?.length === 0 ? (
                search != '' && (
                  <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
                    No Songs Found
                  </header>
                )
              ) : (
                <div>
                  <h1 className="text-center font-semibold text-3xl my-1">
                    Songs
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-2">
                    {searchResults &&
                      searchResults.songs.map((song: any, index: number) => (
                        <SongCard
                          onPlaySong={handlePlay}
                          index={index}
                          song={song}
                          key={song.id}
                          img={song?.coverArt}
                          songName={song?.name}
                          artist={song.artist}
                        />
                      ))}
                  </div>
                </div>
              )}
              {searchResults && searchResults?.playlists?.length === 0 ? (
                search != '' && (
                  <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
                    {/* No Playlists Found */}
                  </header>
                )
              ) : (
                <div>
                  <h1 className="text-center font-semibold text-3xl my-1">
                    Playlists
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-2">
                    {searchResults &&
                      searchResults.playlists.map(
                        (playlist: any, index: number) => (
                          <PlayListCard
                            id={playlist?.id}
                            img={playlist?.coverArt}
                            playListName={playlist?.name}
                          />
                        ),
                      )}
                  </div>
                </div>
              )}
              {searchResults && searchResults?.users?.length < 1 ? (
                search != '' && (
                  <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
                    {/* No Artist Found */}
                  </header>
                )
              ) : (
                <div>
                  <h1 className="text-center font-semibold text-3xl my-1">
                    Artists
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-2">
                    {searchResults &&
                      searchResults.users.map((user: any, index: number) => (
                        <SuggestedPeopleCard key={user.id} user={user} />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Main>
  )
}

export default SearchResults
