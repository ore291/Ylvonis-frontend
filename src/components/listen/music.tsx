import player, { usePlayerState } from '@/lib/player'
import {
  useGetRecentPlayistsQuery,
  useGetRecentSongsQuery,
} from '@/store/api/song'
import React from 'react'
import Loading from '../utils/Loading'
import SongCard from '../library/SongLibrary/SongCard'
import PlayListCard from '../library/Myplaylist/PlayListCard'

function Music() {
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
  ]

  const { data: songs, error, isLoading, isSuccess } = useGetRecentSongsQuery(
    null
  )
  const {
    data: playlists,
    error: playlistError,
    isLoading: isGettingPlaylists,
    isSuccess: isPlaylistGot,
  } = useGetRecentPlayistsQuery(null, {
    refetchOnMountOrArgChange: true,
  })

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
          id: 'recent-songs',
          title: 'recent-songs',
          imageUrl: '',
          tracks: songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: 'recent-songs',
          title: 'recent-songs',
          imageUrl: '',
          tracks: songs,
        },
        0,
      )
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== 'recent-songs') {
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
    <main className="overflow-scroll   md:p-2">
      <section className="grid gap-4 ">
        <h1 className="font-semibold text-xl p-2">Recently played</h1>
        {isLoading ? (
          <div className="w-full flex-container h-20">
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
      <section className="grid gap-4 mt-5">
        <h1 className="font-semibold text-lg p-2">Today's Hot PlayLists</h1>

        {isGettingPlaylists ? (
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
                      id={playlist?._id}
                      img={playlist?.coverArt}
                      playListName={playlist?.name}
                    />
                  </div>
                ))}{' '}
              </div>
            )}
          </section>
        )}
      </section>
      <section className="grid gap-4 mt-5">
        <h1 className="font-semibold text-lg p-2">Top Albums 2022</h1>

        {isLoading ? (
          <div className="w-full flex-container h-20">
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

export default Music
