import Loading from '../utils/Loading'
import player, { usePlayerState } from '../../lib/player'
import React from 'react'
import { fullBrowserVersion } from 'react-device-detect'
import { BsListUl } from 'react-icons/bs'
import SongCard from '../library/SongLibrary/SongCard'

function OtherUserSongs({ songs }: { songs: any }) {
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
          id: 'other-user-songs',
          title: 'other-user-songs',
          imageUrl: '',
          tracks: songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: 'other-user-songs',
          title: 'other-user-songs',
          imageUrl: '',
          tracks: songs,
        },
        0,
      )
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== 'other-user-songs') {
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
    <>
      <section>
        <div className="flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">
            {songs ? songs.length : 0} songs{' '}
          </div>
          <button>
            {' '}
            <BsListUl size={30} className="text-utilGray" />{' '}
          </button>
        </div>
      </section>
      <section className="">
        {songs && songs.length === 0 ? (
          <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
            No Songs Found
          </header>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
            {songs &&
              songs.map((song: any, index: number) => (
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
  )
}

export default OtherUserSongs
