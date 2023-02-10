import player, { usePlayerState } from '../../../lib/player'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'clsx'
import s from './Cover.module.css'
import { PlayingIcon, PlayIcon, PauseIcon } from '../../Icons'
import { Button } from '../../UI'
import { FaRegHeart } from 'react-icons/fa'
import { BsFillHeartFill, BsHeart, BsThreeDotsVertical } from 'react-icons/bs'
import { useState } from 'react'

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
    console.log("gotten here...")
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
  {
    /* <Link href={`/playlist/${encodeURIComponent(playlist.id)}`}> */
  }
  return (
    <div className={cn(s.container)}>
      <div className={cn(s.root)}>
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
        <Button variant="naked" size="slim" onClick={() => setHeart(!heart)}>
          {heart ? (
            <BsFillHeartFill size={30} className="text-brand  " />
          ) : (
            <BsHeart size={30} />
          )}
        </Button>
        {playing ? (
          <Button variant="ghost" size="slim" onClick={() => PlayTrack(2)}>
            <PauseIcon />
          </Button>
        ) : (
          <Button variant="ghost" size="slim" onClick={()=>PlayTrack(2)}>
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
