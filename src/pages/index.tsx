import { useRouter } from 'next/router'

import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Music from '@/components/listen/music'
import SongCard from '@/components/Cards/SongCard'
import { array } from 'yup/lib/locale'

// import Globe from '../components/Globe'

const DynamicGlobe = dynamic(() => import('../components/Globe'), {
  ssr: false,
})

const Index = () => {
  const router = useRouter()

  return (
    <Main meta={<Meta title="Ylvonis" description="music app" />} title="Home">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 ">
        <div className="md:col-span-3 ">
          <DynamicGlobe />
        </div>
        <div className="md:col-span-2">
          <Tabs
            defaultFocus={true}
            selectedTabClassName={'bg-transparent focused-tab !relative'}
          >
            <TabList
              className={
                'bg-bgGray flex items-center justify-between border-b border-[#343434] text-utilGray  py-1 md:py-3'
              }
            >
              <Tab>All</Tab>
              <Tab>Top Songs</Tab>

              <Tab>Hot Artists</Tab>
              <Tab>Trendy Songs</Tab>
            </TabList>
            <div className="bg-bgGray">
              <TabPanel>
                <div className="flex flex-col h-min overflow-auto">
                  {[...Array(5)].map((_, i) => (
                    <SongCard  key={i}/>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col h-min overflow-auto">
                  {[...Array(5)].map((_, i) => (
                    <SongCard key={i}/>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col h-min overflow-auto">
                  {[...Array(5)].map((_, i) => (
                    <SongCard key={i}/>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col h-min overflow-auto">
                  {[...Array(5)].map((_, i) => (
                    <SongCard key={i}/>
                  ))}
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </Main>
  )
}

export default Index
