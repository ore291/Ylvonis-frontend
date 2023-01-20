import { useRouter } from 'next/router'

import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Music from '@/components/listen/music'

// import Globe from '../components/Globe'

const DynamicGlobe = dynamic(() => import('../components/Globe'), {
  ssr: false,
})

const Index = () => {
  const router = useRouter()

  return (
    <Main meta={<Meta title="Ylvonis" description="music app" />} title="Home">
      <div className="w-full grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-3">
          <DynamicGlobe />
        </div>
        <div className="col-span-2">
          <Tabs
            defaultFocus={true}
            selectedTabClassName={'bg-transparent focused-tab !relative'}
          >
            <TabList
              className={
                'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3'
              }
            >
              <Tab>All</Tab>
              <Tab>Top Songs</Tab>
              {/* the third page in the design didnt have anything, so i didn't do anything */}
              <Tab>Hot Artists</Tab>
              <Tab>Trendy Songs</Tab>
            </TabList>

            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>
        </div>
      </div>
    </Main>
  )
}

export default Index
