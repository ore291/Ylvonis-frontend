import { Meta } from '@/layouts/Meta'
import { usePlayerState } from '@/lib/player'
import { Main } from '@/templates/Main'
import React, { useEffect, useState } from 'react'
import {
  BsChevronDown,
  BsFillHeartFill,
  BsHeart,
  BsThreeDots,
} from 'react-icons/bs'
import { RiPlayListFill } from 'react-icons/ri'
import Image from 'next/image'
import SongControl from '@/components/Player/PlayerControls/SongControl'
import { Button } from '@/components/UI'
import SongVolume from '@/components/Player/PlayerVolumeControls/SongVolume'
import { useRouter } from 'next/router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useLikeSongMutation } from '@/store/api/song'
import { useSession } from 'next-auth/react'

const Song = () => {
  const { currentTrack } = usePlayerState()

  const { data: session, status } = useSession()

  const [liked, setLiked] = useState(currentTrack?.likes.includes(session?.user?.id))

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

  useEffect(() => {
    if (!currentTrack) {
      if (router.isReady) router.push('/')
    }
  }, [currentTrack, router.isReady])

  return (
    <Main meta={<Meta title="Ylvonis" description="music app" />} title="Now Playing">
      <div className="w-full min-h-screen">
        <div className="px-2 pt-5 flex items-center justify-between">
          <button onClick={() => router.back()}>
            <BsChevronDown className="w-6 h-6 text-white" />
          </button>
          <span className="text-xl font-medium text-white">Now Playing</span>
          <button>
            <RiPlayListFill className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-8">
          <div className="relative rounded-xl w-full h-[280px]">
            <Image
              src={currentTrack?.coverArt}
              fill
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 px-4">
          <div className="flex items-center justify-between">
            {liked ? (
              <Button
                variant="naked"
                size="slim"
                disabled={isLiking}
                onClick={() => handleLike(currentTrack?.id)}
              >
                <BsFillHeartFill size={24} className="text-brand  " />
              </Button>
            ) : (
              <Button
                variant="naked"
                size="slim"
                disabled={isLiking}
                onClick={() => handleLike(currentTrack?.id)}
              >
                <BsHeart size={24} />
              </Button>
            )}
            <span className="font-semibold text-lg text-center flex-1 truncate max-w-full">
              {currentTrack?.name}
            </span>
            <button>
              <BsThreeDots className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-container">
            <span className="font-medium text-sm text-[#9a9a9a]">{currentTrack?.artist}</span>
          </div>
          <SongControl />
          <SongVolume />
          <div className=" w-full">
            <Tabs
              defaultFocus={true}
              selectedTabClassName={'bg-transparent focused-tab !relative'}
            >
              <TabList
                className={
                  'bg-bgGray text-sm truncate flex items-center justify-between border-b border-[#343434] text-utilGray  py-1 md:py-3'
                }
              >
                <Tab>Lyrics</Tab>
                <Tab>Info</Tab>
                <Tab>Comments</Tab>
              </TabList>
              <div className="bg-bgGray">
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Song
