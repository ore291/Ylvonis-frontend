import player, { usePlayerState } from '@/lib/player'
import { useGetTrendingSongsQuery } from '@/store/api/song'
import React from 'react'
import SongCard from '../library/SongLibrary/SongCard'
import Loading from '../utils/Loading'

function Trending() {
  const recent = [
    {
      img: 'mercy.png',
      songTitle: 'You Are God',
      artist: 'Nathaniel Bassey',
    },
    {
      img: 'trumphet.png',
      songTitle: 'Amazing God',
      artist: 'Mercy Chinwo',
    },
    {
      img: 'gylain.jpg',
      songTitle: 'Obinigwe',
      artist: 'Minister GUC',
    },
    {
      img: 'soll.jpg',
      songTitle: 'skater boy',
      artist: 'ava levine',
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe',
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe',
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe',
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe',
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe',
    },
  ]
  const { data: songs, error, isLoading, isSuccess } = useGetTrendingSongsQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    },
  )

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
          id: 'trending-songs',
          title: 'trending-songs',
          imageUrl: '',
          tracks: songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: 'trending-songs',
          title: 'trending-songs',
          imageUrl: '',
          tracks: songs,
        },
        0,
      )
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== 'trending-songs') {
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
    <main className="   md:p-2">
      <section>
        <h1 className="font-semibold text-xl my-2  p-2">Trending</h1>
        {isLoading ? (
          <div className="w-full flex-container h-[60vh]">
            <Loading w="8" h="8" />
          </div>
        ) : songs && songs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4">
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
        ) : (
          <div className="flex justify-center my-5">
            <h1>No songs found</h1>
          </div>
        )}
      </section>
    </main>
  )
}

export default Trending
