import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import RecentArtists from './recent'
import LikedArtists from './liked'
import FollowedArtists from './followed'
import useAuth from '@/hooks/useAuth'

function MainPage() {
  const auth = useAuth()
  return (
    <div>
      <Tabs
        defaultFocus={true}
        selectedTabClassName={'bg-transparent focused-tab !relative'}
      >
        <TabList
          className={
            'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3 md:items-start md:justify-start'
          }
        >
          <Tab>Recent</Tab>
          <Tab>Liked</Tab>
          <Tab>Followed</Tab>
        </TabList>
        <TabPanel>
          <RecentArtists />
        </TabPanel>
        <TabPanel>
          <LikedArtists />
        </TabPanel>
        <TabPanel>
          <FollowedArtists />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default MainPage
