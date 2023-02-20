import React from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import RecentPlayLists from '@/components/library/Myplaylist/recent'
import SubscribedPlaylists from '@/components/library/Myplaylist/subscribed'
import LikedPlaylists from '@/components/library/Myplaylist/liked'
import useAuth from '@/hooks/useAuth'

const  MyPlaylist = () => {

  const isAuthenticated = useAuth(true)
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title="My Playlists"
      nested={true}
    >
      
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
            <Tab>Subscribed</Tab>
            <Tab>Liked</Tab>
          </TabList>
          <TabPanel>
            <RecentPlayLists />
          </TabPanel>
          <TabPanel>
            <SubscribedPlaylists />
          </TabPanel>
          <TabPanel>
            <LikedPlaylists />
          </TabPanel>
        </Tabs>
    
    </Main>
  )
}

export default MyPlaylist
