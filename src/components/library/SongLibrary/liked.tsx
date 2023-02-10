import Loading from '@/components/utils/Loading'
import player, { usePlayerState } from '@/lib/player'
import songs from '@/pages/library/songs'
import { useGetUserLikedSongsQuery } from '@/store/api/song'
import React from 'react'
import { BsListUl } from 'react-icons/bs'
import SongCard from './SongCard'

function LikedSongs() {
  const { data, error, isLoading, isSuccess } = useGetUserLikedSongsQuery(null)

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
          id: 'my_liked_songs',
          title: 'my_liked_songs',
          imageUrl: '',
          tracks: data.songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: 'my_liked_songs',
          title: 'my_liked_songs',
          imageUrl: '',
          tracks: data.songs,
        },
        0,
      )
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== 'my_liked_songs') {
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
    <main>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading w="14" h="14" />
        </div>
      ) : (
        <>
          <section>
            <nav className="flex w-full justify-between p-4 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
              <div className="capitalize text-utilGray">
                {data?.songs ? data.songs.length : 0} songs{' '}
              </div>
              <button>
                {' '}
                <BsListUl size={30} className="text-utilGray" />{' '}
              </button>
            </nav>
          </section>
          <section className="">
            {data.songs && data.songs.length === 0 ? (
              <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
                No Songs Found
              </header>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
                {data.songs &&
                  data.songs.map((song: any, index: number) => (
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
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default LikedSongs
