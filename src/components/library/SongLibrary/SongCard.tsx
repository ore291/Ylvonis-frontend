import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  BsFillHeartFill,
  BsHeart,
  BsMusicNoteBeamed,
  BsPauseFill,
  BsPlayFill,
  BsThreeDotsVertical,
} from 'react-icons/bs'
import Link from 'next/link'
import { SlOptionsVertical, SlPlaylist } from 'react-icons/sl'
import { FaMinus, FaRegHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import {
  useAddToPlaylistMutation,
  useGetUserPlaylistQuery,
  useLikeSongMutation,
} from '@/store/api/song'
import { isMobile } from 'react-device-detect'
import { Modal } from 'flowbite-react'
import Loading from '@/components/utils/Loading'
import { MdAdd, MdAddCircleOutline, MdPlaylistAdd } from 'react-icons/md'
import { usePlayerState } from '@/lib/player'
import { Button } from '@/components/UI'

//
interface SongPropTypes {
  song?: any
  img?: string
  songName: string
  artist: string
  onPlaySong?: any
  index: number
}

function SongCard({ song, onPlaySong, index }: SongPropTypes) {
  const [
    likeSong, // This is the mutation trigger
    { isLoading: isLiking, isSuccess: isLiked, data: likedData }, // This is the destructured mutation result
  ] = useLikeSongMutation()



  const { currentTrack, playing, currentTrackIndex } = usePlayerState()
  const [playlistAdd, setPlaylistAdd] = useState(false)

  const [
    addToPlaylist, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useAddToPlaylistMutation()
  const {
    data: playlists,
    error,
    isLoading,
    isSuccess,
  } = useGetUserPlaylistQuery(null, { skip: !playlistAdd })

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

  const { data: session, status } = useSession()

  const [liked, setLiked] = useState(song.likes.includes(session?.user?.id))
  return (
    <>
      {/* mobile playlist view */}
      {isMobile ? (
        <>
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
                    onClick={() => onPlaySong(index)}
                  >
                    <BsPauseFill className="fill-white w-5 h-5" />
                  </button>
                ) : (
                  <button
                    className="rounded-full flex-container  p-1 bg-brand cursor-pointer"
                    onClick={() => onPlaySong(index)}
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
          </div>
        </>
      ) : (
        <div className="hidden md:block ">
          <div className="relative w-full h-[200px] cursor-pointer">
            <Image
              onClick={() => onPlaySong(index)}
              src={`${song.coverArt}`}
              fill
              alt={song.name}
              className=" shadow-md object-cover  rounded-lg"
            />
            {status == 'authenticated' && (
              <button
                className="absolute right-3 top-2"
                onClick={() => handleLike(song.id)}
              >
                {liked ? (
                  <BsFillHeartFill size={24} className="text-brand " />
                ) : (
                  <BsHeart size={24} />
                )}
              </button>
            )}
          </div>
          <div className="w-full flex items-center justify-between px-1">
            <span className="w-[90%] truncate text-xl font-semibold text-white capitalize">
              {song.name}
            </span>
            {status == 'authenticated' && (
              <button onClick={() => setPlaylistAdd(!playlistAdd)}>
                <MdPlaylistAdd className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="px-1 mt-1">
            <span className="capitalize font-normal text-utilGray">
              {song.artist}
            </span>
          </div>
        </div>
      )}
      {/* <div
        onClick={() => onPlaySong(index)}
        className="md:hidden w-full flex justify-between items-center border-b-[0.5px] border-solid border-utilGray py-4 px-1"
      >
        <div className="w-1/4">
          <BsMusicNoteBeamed size={32} />
        </div>
        <div className="w-2/4 capitalize flex-col flex">
          <span>{song.name}</span>
          <span className="text-sm text-utilGray">{song.artist}</span>
        </div>
        <div className="w-1/4 ml-auto">
          <div className="flex justify-end ">
            <SlOptionsVertical size={25} className="text-white" />
          </div>
        </div>
      </div> */}
      {/* desktop playlist view */}

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
    </>
  )
}

export default SongCard
