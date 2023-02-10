import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '../UI'
import { HiSpeakerWave } from 'react-icons/hi2'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { MdAdd, MdAddCircleOutline, MdPlaylistAdd } from 'react-icons/md'
import { usePlayerState } from '@/lib/player'
import {
  useAddToPlaylistMutation,
  useGetUserPlaylistQuery,
  useLikeSongMutation,
} from '@/store/api/song'
import { useSession } from 'next-auth/react'
import { Modal } from 'flowbite-react'
import { SlPlaylist } from 'react-icons/sl'
import { FaMinus } from 'react-icons/fa'
import Link from 'next/link'
import Loading from '../utils/Loading'

const AlbumCard = ({
  song,
  handlePlay,
  index,
}: {
  song: any
  index: number
  handlePlay: any
}) => {
  const { data: session, status } = useSession()
  const { currentTrack, playing, currentTrackIndex } = usePlayerState()
  const [playlistAdd, setPlaylistAdd] = useState(false)
  const [liked, setLiked] = useState(song.likes.includes(session?.user?.id))

  const [
    addToPlaylist, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useAddToPlaylistMutation()

  const [
    likeSong, // This is the mutation trigger
    { isLoading: isLiking, isSuccess: isLiked, data: likedData }, // This is the destructured mutation result
  ] = useLikeSongMutation()

  const handleLike = (id: string) => {
    likeSong(id)
    setLiked(!liked)
  }

  useEffect(() => {
    if (!isLiked) return

    if (likedData?.message === 'liked') {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [isLiked])

  const {
    data: playlists,
    error,
    isLoading,
    isSuccess,
  } = useGetUserPlaylistQuery(null, { skip: !playlistAdd })



  return (
    <div className="flex w-full items-center ">
      <div
        onClick={() => handlePlay(index)}
        className="flex justify-start items-center cursor-pointer space-x-1 md:space-x-5  group flex-1"
      >
        {song.id === currentTrack?.id ? (
          <HiSpeakerWave className="w-6 h-6 text-brand" />
        ) : (
          <span className="text-utilGray text-sm font-medium w-6">{index + 1}</span>
        )}
        <div className="relative w-10 h-10 rounded-sm">
          <Image
            src={song.coverArt}
            alt={song.name}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white text-xl font-semibold group-hover:text-brand">
            {song.name}
          </span>
          <span className="text-sm text-utilGray  font-medium">
            {song.artist}
          </span>
        </div>
      </div>
      <div className="flex-container space-x-5">
        {status === 'authenticated' ? (
          <div className="flex items-center space-x-2">
            {' '}
            <Button
              variant="naked"
              size="slim"
              disabled={isLiking}
              onClick={() => handleLike(song.id)}
            >
              {liked ? (
                <BsFillHeartFill size={15} className="text-brand  " />
              ) : (
                <BsHeart size={15} />
              )}
            </Button>
            <button onClick={() => setPlaylistAdd(!playlistAdd)}>
              <MdPlaylistAdd className="w-6 h-6" />
            </button>
          </div>
        ) : null}
        <span className="text-sm text-utilGray font-semibold">
          {song.duration}
        </span>
      </div>
      <React.Fragment>
        <Modal
          show={playlistAdd}
          onClose={() => setPlaylistAdd(false)}
          size="lg"
        >
          <Modal.Header className="bg-gray-900 text-white text-center">
            <span className="text-brand text-center !text-2xl flex items-center space-x-1">
              <SlPlaylist />
              Add To Playlists
            </span>
          </Modal.Header>
          <Modal.Body className="bg-gray-900 text-white ">
            <Link href="/playlists">
              <div className=" h-12 flex items-center space-x-2 cursor-pointer">
                <MdAddCircleOutline className="w-8 h-8 text-white" />
                <div className="flex flex-col justify-between">
                  <span className="text-xl font-semibold text-white">
                    Create new playlist
                  </span>
                  <span className="text-xs font-light text-utilGray">
                    Click here to create a new playlist
                  </span>
                </div>
              </div>
            </Link>
            {isLoading ? (
              <div className="w-full flex-container my-4">
                <Loading w="7" h="7" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-1">
                {playlists?.length > 0 &&
                  playlists.map((playlist: any) => (
                    <div
                      className="h-14 w-full row-container cursor-pointer"
                      key={playlist.id}
                      onClick={() =>
                        addToPlaylist({
                          playlist_id: playlist.id,
                          song_id: song.id,
                        })
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-md">
                          <Image
                            alt={playlist.name}
                            src={playlist.coverArt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="col-container !items-start">
                          <span className="text-white font-semibold text-sm">
                            {playlist.name}
                          </span>
                          <span className="text-xs font-medium">
                            {`(${playlist?.songs.length}) songs`}
                          </span>
                        </div>
                      </div>
                      <button disabled={isUpdating}>
                        {playlist?.songs?.includes(song.id) ? (
                          <FaMinus className="w-7 h-7 text-brand" />
                        ) : (
                          <MdAdd className="w-7 h-7 text-brand" />
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  )
}

export default AlbumCard
