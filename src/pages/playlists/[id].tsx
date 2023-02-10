import React, { useState, useEffect } from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import {
  useGetSinglePlaylistQuery,
  useLikePlaylistMutation,
  useSubscribePlaylistMutation,
} from '@/store/api/song'
import { useRouter } from 'next/router'
import Loading from '@/components/utils/Loading'
import Image from 'next/image'
import { MdSubscriptions } from 'react-icons/md'
import { FaHeart, FaPause, FaPlay, FaRegHeart } from 'react-icons/fa'
import { Tooltip } from 'flowbite-react'
import player, { usePlayerState } from '@/lib/player'
import AlbumCard from '@/components/Cards/AlbumCard'
import { useSession } from 'next-auth/react'
import { TbPlaylistX } from 'react-icons/tb'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'

function Playlist() {
  const router = useRouter()

  const { data: session, status } = useSession()

  const { id } = router.query

  const [skip, setSkip] = React.useState(true)

  const {
    data: playlist,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useGetSinglePlaylistQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: skip,
  })

  const [liked, setLiked] = useState(false)

  const [playlistSubscribed, setPlaylistSubscribed] = useState(false)

  useEffect(() => {
    if (!isSuccess) return

    setLiked(playlist.likes.includes(session?.user?.id))
    setPlaylistSubscribed(playlist.subscribers.includes(session?.user?.id))
  }, [isSuccess])

  const [
    likePlaylist, // This is the mutation trigger
    { isLoading: isLiking, isSuccess: isLiked, data: likedData }, // This is the destructured mutation result
  ] = useLikePlaylistMutation()

  const [
    subscribePlaylist, // This is the mutation trigger
    { isLoading: isSubscribing, isSuccess: isSubscribed, data: subscribedData }, // This is the destructured mutation result
  ] = useSubscribePlaylistMutation()

  const handleLike = (id: string) => {
    likePlaylist(id)
    setLiked(!liked)
  }
  const handleSubscribe = (id: string) => {
    subscribePlaylist(id)
    setPlaylistSubscribed(!playlistSubscribed)
  }

  useEffect(() => {
    if (!isLiked) return

    if (likedData?.message === 'liked') {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [isLiked])

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
          id: playlist.id,
          title: playlist.name,
          imageUrl: '',
          tracks: playlist.songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: playlist.id,
          title: playlist.name,
          imageUrl: '',
          tracks: playlist.songs,
        },
        0,
      )
    }
    console.log(state.playlist)
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== playlist.id) {
      // set Queue
      setQueue(index)
      player.play()
      return
    } else {
      // handle play
      PlayTrack(index || 0)
    }
  }

  React.useEffect(() => {
    if (!router.isReady) return
    setSkip(false)
  }, [router.isReady])

  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Playlist"
      nested={true}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading w="10" h="10" />
        </div>
      ) : (
        playlist && (
          <div className="bg-[#1C1C1C] max-w-5xl mx-auto min-h-min px-2 md:px-5">
            <div className="grid grid-cols-2 items-center md:grid-cols-3 gap-x-2 md:gap-x-5 md:mt-10">
              <div className="relative w-full flex md:block items-center justify-center ">
                <div className="md:absolute md:-top-3 rounded-lg">
                  <Image
                    src={playlist?.coverArt}
                    width={isMobile ? 2500 : 400}
                    height={isMobile ? 250 : 400}
                    className="object-contain rounded-lg"
                    alt=""
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex relative   md:justify-start my-5 md:my-0 md:h-[300px] ">
                <button
                  className="absolute right-2 top-2"
                  onClick={() => handleLike(playlist.id)}
                >
                  {liked ? (
                    <FaHeart className="w-5 h-5 text-brand" />
                  ) : (
                    <FaRegHeart className="w-5 h-5" />
                  )}
                </button>
                <div className="flex flex-col justify-center items-start space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold capitalize">
                    {playlist.name}
                  </h1>
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-semibold text-gray-300 md:text-white">
                      Runtime:{' '}
                      <span className=" capitalize font-medium">
                        {playlist.songs.length} tracks
                      </span>
                    </span>
                    <Link
                      href={`/profile/${playlist.user.username}`}
                      className="text-xs md:text-sm font-semibold text-gray-300 md:text-white"
                    >
                      Playlist Creator:{' '}
                      <span className="gradText capitalize font-medium">
                        {playlist.user.username}
                      </span>
                    </Link>
                    <span className="text-xs md:text-sm font-semibold text-gray-300 md:text-white">
                      Last Updated:{' '}
                      <span className="text-xs md:text-sm font-medium">
                        {new Date(playlist.updatedAt).toDateString()}
                      </span>
                    </span>
                  </div>
                  <ul className="flex items-center space-x-3 mt-3">
                    <li>
                      {state.playlist.id == playlist.id && state.playing ? (
                        <button
                          onClick={() => handlePlay()}
                          className="gradButton px-1 w-32 flex-container space-x-2 h-8 rounded-sm "
                        >
                          <span className="text-lg font-medium">
                            Playing...
                          </span>
                          <FaPause className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePlay()}
                          className="gradButton px-1 w-32 flex-container space-x-2 h-8 rounded-sm "
                        >
                          <span className="text-lg font-medium">Play All</span>
                          <FaPlay className="w-3 h-3" />
                        </button>
                      )}
                    </li>
                    <li className="hidden md:block">
                      <Tooltip style="light" placement="bottom" content="Like">
                        <button onClick={() => handleLike(playlist.id)}>
                          {liked ? (
                            <FaHeart className="w-7 h-7 text-brand" />
                          ) : (
                            <FaRegHeart className="w-7 h-7" />
                          )}
                        </button>
                      </Tooltip>
                    </li>
                    {playlist.user === session?.user?.id ? (
                      <li>
                        {playlistSubscribed ? (
                          <Tooltip
                            style="light"
                            placement="bottom"
                            content="Unsubscribe"
                          >
                            <button
                              onClick={() => handleSubscribe(playlist.id)}
                              disabled={isSubscribing}
                            >
                              <TbPlaylistX className="w-7 h-7" />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            style="light"
                            placement="bottom"
                            content="Subscribe"
                          >
                            <button
                              onClick={() => handleSubscribe(playlist.id)}
                              disabled={isSubscribing}
                            >
                              <MdSubscriptions className="w-7 h-7" />
                            </button>
                          </Tooltip>
                        )}
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>

            {playlist.songs.length > 0 ? (
              <div className="grid grid-cols-1 w-full gap-y-2">
                {playlist.songs &&
                  playlist.songs.map((song: any, index: number) => (
                    <AlbumCard
                      song={song}
                      key={song.id}
                      handlePlay={handlePlay}
                      index={index}
                    />
                  ))}{' '}
              </div>
            ) : (
              <div className="w-full flex-container py-10">
                <h2 className="text-2xl font-semibold">No songs Found</h2>
              </div>
            )}
          </div>
        )
      )}
    </Main>
  )
}

export default Playlist
