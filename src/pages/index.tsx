import { useRouter } from 'next/router'

import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Music from '@/components/listen/music'
import SongCard from '@/components/Cards/SongCard'
import { useGetAllSongsQuery } from '@/store/api/song'
import { Button } from '@/components/UI'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Loading from '@/components/utils/Loading'
import player, { usePlayerState } from '@/lib/player'
import { getServerSession } from 'next-auth'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './api/auth/[...nextauth]'

// import Globe from '../components/Globe'

const DynamicGlobe = dynamic(() => import('../components/Globe'), {
  ssr: false,
})

const Index = () => {
  const router = useRouter()

  const [country, setCountry] = useState({
    name: 'All',
    code: 'all',
  })
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isSuccess } = useGetAllSongsQuery(
    { page, country: country.code, limit },
    { refetchOnMountOrArgChange: true, skip: false },
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
          id: country.code,
          title: country.name,
          imageUrl: '',
          tracks: data.songs,
        },
        index,
      )
    } else {
      player.setQueue(
        {
          id: country.code,
          title: country.name,
          imageUrl: '',
          tracks: data.songs,
        },
        0,
      )
    }
    console.log(state.playlist)
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== country.code) {
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
    <Main meta={<Meta title="Ylvonis" description="music app" />} title="Home">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 ">
        <div className="md:col-span-3 mt-2 md:mt-0">
          <div className="w-full flex justify-between items-center">
            <Button variant="naked" size="slim">
              <BsThreeDotsVertical className="text-white w-6 h-6" />
            </Button>
            <h2 className="capitalize text-sm md:text-xl truncate max-w-max font-semibold text-white">
              {country.name}
            </h2>
            <Button variant="naked" size="slim">
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2782 21.4566C15.2782 22.448 14.643 23.2915 13.7486 23.6266V31.0898H12.0494V23.6269C11.1554 23.2918 10.5199 22.4477 10.5199 21.4569C10.5199 20.1719 11.5849 19.1314 12.8988 19.1314C14.2132 19.1309 15.2782 20.1719 15.2782 21.4566ZM36 12.8828V8.37461C36 3.74939 32.1643 0 27.4323 0C22.7003 0 18.864 3.74939 18.864 8.37461V14.2217H1.17305V14.222C1.17201 14.222 1.1707 14.2217 1.16966 14.2217C0.524044 14.222 0 14.7339 0 15.366C0 15.367 0 15.368 0 15.3691V34.8532C0 34.8544 0 34.8555 0 34.8562C0 35.4873 0.524044 36 1.16992 36H1.17305H24.6257H24.6288C25.2747 36 25.7995 35.4883 25.7995 34.8562C25.7995 34.8555 25.7995 34.8544 25.7995 34.8532V15.3688C25.7995 15.3678 25.7995 15.3668 25.7995 15.3658C25.7995 14.7342 25.276 14.2215 24.6288 14.2215C24.6277 14.2215 24.6267 14.2217 24.6257 14.2217V14.2215H21.5007V8.37461C21.5007 5.17281 24.156 2.57686 27.4323 2.57686C30.708 2.57686 33.3636 5.17281 33.3636 8.37461V12.753C33.3587 12.7958 33.3571 12.839 33.3571 12.883C33.3571 13.5965 33.9486 14.1744 34.6783 14.1744C35.408 14.1741 36 13.596 36 12.8828Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
          <DynamicGlobe setCountry={setCountry} />
        </div>
        <div className="md:col-span-2 w-full">
          <Tabs
            defaultFocus={true}
            selectedTabClassName={'bg-transparent focused-tab !relative'}
          >
            <TabList
              className={
                'bg-bgGray text-sm truncate flex items-center justify-between border-b border-[#343434] text-utilGray  py-1 md:py-3'
              }
            >
              <Tab>All</Tab>
              <Tab>Top Songs</Tab>

              <Tab>Hot Artists</Tab>
              <Tab>Trendy Songs</Tab>
            </TabList>
            <div className="bg-bgGray">
              {isLoading ? (
                <div className="w-full h-20 flex items-center justify-center">
                  <Loading w="6" h="6" />
                  <TabPanel />
                  <TabPanel />
                  <TabPanel />
                  <TabPanel />
                </div>
              ) : (
                <>
                  <TabPanel>
                    <div className="flex flex-col h-min overflow-auto">
                      {data?.songs && data.songs.length > 0 ? (
                        data.songs.map((song: any, index: any) => (
                          <SongCard
                            index={index}
                            handlePlay={handlePlay}
                            song={song}
                            key={song.id}
                          />
                        ))
                      ) : (
                        <div className="w-full h-[90px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
                          <span className="text-xl font-xemibold">
                            No Songs Found
                          </span>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="flex flex-col h-min overflow-auto">
                      {data?.songs && data.songs.length > 0 ? (
                        data.songs.map((song: any, index: any) => (
                          <SongCard
                            index={index}
                            handlePlay={handlePlay}
                            song={song}
                            key={song.id}
                          />
                        ))
                      ) : (
                        <div className="w-full h-[90px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
                          <span className="text-xl font-xemibold">
                            No Songs Found
                          </span>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="flex flex-col h-min overflow-auto">
                      {data?.songs && data.songs.length > 0 ? (
                        data.songs.map((song: any, index: any) => (
                          <SongCard
                            index={index}
                            handlePlay={handlePlay}
                            song={song}
                            key={song.id}
                          />
                        ))
                      ) : (
                        <div className="w-full h-[90px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
                          <span className="text-xl font-xemibold">
                            No Songs Found
                          </span>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="flex flex-col h-min overflow-auto">
                      {data?.songs && data.songs.length > 0 ? (
                        data.songs.map((song: any, index: any) => (
                          <SongCard
                            index={index}
                            handlePlay={handlePlay}
                            song={song}
                            key={song.id}
                          />
                        ))
                      ) : (
                        <div className="w-full h-[90px] place-content-center p-2 flex items-center space-x-2 cursor-pointer border-b border-chatGray">
                          <span className="text-xl font-xemibold">
                            No Songs Found
                          </span>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                </>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </Main>
  )
}

export default Index

export async function getServerSideProps(context: {
  req:
    | any
    | NextApiRequest
    | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
  res: any | ServerResponse<IncomingMessage> | NextApiResponse<any>
}) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: `/login`,
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    props: {},
  }
}
