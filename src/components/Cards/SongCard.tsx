import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  BsFillHeartFill,
  BsHeart,
  BsPauseFill,
  BsPlayFill,
  BsThreeDotsVertical,
} from 'react-icons/bs'
import { Button } from '../UI'
import { PauseIcon, PlayIcon } from '../Icons'
import { usePlayerState } from '@/lib/player'
import { MdAdd, MdAddCircleOutline, MdPlaylistAdd } from 'react-icons/md'
import { Modal } from 'flowbite-react'
import { SlPlaylist } from 'react-icons/sl'
import {
  useAddToPlaylistMutation,
  useGetUserPlaylistQuery,
  useLikeSongMutation,
} from '@/store/api/song'
import Link from 'next/link'
import Loading from '../utils/Loading'
import { useSession } from 'next-auth/react'
import { FaMinus } from 'react-icons/fa'

const SongCard = ({
  song,
  handlePlay,
  index,
}: {
  song: any
  handlePlay: any
  index: number
}) => {
  const { currentTrack, playing, currentTrackIndex } = usePlayerState()
  const [playlistAdd, setPlaylistAdd] = useState(false)

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

  const { data: session, status } = useSession()

  const [liked, setLiked] = useState(song.likes.includes(session?.user?.id))

  return (
    <div className="w-full h-[70px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
      <div className="basis-1/5 relative w-full h-full rounded-md">
        <Image
          fill
          alt={song.name}
          src={song.coverArt}
          className="object-cover"
        />
      </div>
      <div className="basis-4/5 flex items-center justify-between px-1">
        <div className="flex flex-col justify-center space-y-2 w-full">
          <p className="text-lg truncate w-[90%] font-semibold text-white">
            {song.name}
          </p>
          <span className="text-sm text-utilGray">{song.artist}</span>
        </div>
        <div className="flex items-center space-x-1">
          {currentTrackIndex == index && playing ? (
            <button
              className="rounded-full flex-container  p-1 bg-brand cursor-pointer"
              onClick={() => handlePlay(index)}
            >
              <BsPauseFill className="fill-white w-5 h-5" />
            </button>
          ) : (
            <button
              className="rounded-full flex-container  p-1 bg-brand cursor-pointer"
              onClick={() => handlePlay(index)}
            >
              <BsPlayFill className="fill-white w-5 h-5" />
            </button>
          )}
          {status === 'authenticated' ? (
            <>
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
            </>
          ) : null}
        </div>
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

export default SongCard
