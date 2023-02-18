import player, { usePlayerState } from '../../../lib/player'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'clsx'
import s from './Cover.module.css'
import { PlayingIcon, PlayIcon, PauseIcon } from '../../Icons'
import { Button } from '../../UI'
import { FaRegHeart } from 'react-icons/fa'
import { BsFillHeartFill, BsHeart, BsThreeDotsVertical } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'
import { useLikeSongMutation } from '@/store/api/song'
import { useSession } from 'next-auth/react'

export interface props {
  coverUrl?: string
  title?: string
  artist?: string
  className?: string
}

const Cover: React.FC<props> = (props) => {
  const {
    coverUrl = '/Popular_hits.jpg',
    title,
    artist,
    className,
    ...rest
  } = props

  const {
    currentTrack,
    playing,
    playlist,
    currentTrackIndex,
  } = usePlayerState()

  // const handlePlay = () => {
  //   if (playing) {
  //     player.pause()
  //   } else {
  //     // player.play()
  //     player.playTrack(currentTrackIndex || 2)
  //   }
  // }

  const PlayTrack = (index: number = 2) => {
    if (playing && index === currentTrackIndex) {
      player.pause()
    } else if (index !== currentTrackIndex) {
      player.playTrack(index)
      player.play()
    } else {
      player.play()
    }
  }

  if (!currentTrack) {
    return null
  }

  const [heart, setHeart] = useState<boolean>(false)

  const { data: session, status } = useSession()

  const [liked, setLiked] = useState(
    currentTrack?.likes.includes(session?.user?.id),
  )

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

  const router = useRouter()



  const handleSong = () => {
    if (isMobile) {
      router.push(`/song/${currentTrack.id}`)
    }
  }

  return (
    <div className={cn(s.container)}>
      <div onClick={() => handleSong()} className={cn(s.root)}>
        {/* <PlayingIcon /> */}
        <div className="relative w-[50px] h-[50px] md:w-[80px] md:h-[80px]">
          <Image alt="" className={cn(s.img)} fill src={coverUrl} />
        </div>

        <div className={cn(s.info)}>
          <p className={cn(s.title)}>{currentTrack.name}</p>
          <p className={cn(s.artist)}>{currentTrack.artist}</p>
        </div>
      </div>
      <div className="flex md:hidden space-x-1 pr-1 ">
        <Button
          variant="naked"
          size="slim"
          onClick={() => handleLike(currentTrack?.id)}
        >
          {liked ? (
            <BsFillHeartFill size={30} className="text-brand  " />
          ) : (
            <BsHeart size={30} />
          )}
        </Button>
        {playing ? (
          <Button variant="ghost" size="slim" onClick={() => PlayTrack()}>
            <PauseIcon />
          </Button>
        ) : (
          <Button variant="ghost" size="slim" onClick={() => PlayTrack()}>
            <PlayIcon />
          </Button>
        )}
        <Button variant="naked" size="slim">
          <BsThreeDotsVertical className="w-7 h-7" />
        </Button>
      </div>
    </div>
  )
}

export default Cover
