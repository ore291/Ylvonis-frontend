import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RecentPlayList from './recent';
import SubscribedPlaylists from './subscribed';
import LikedPlaylists from './liked';

function MainPage() {
  return (
    <div> <Tabs defaultFocus={true} selectedTabClassName={'bg-transparent focused-tab !relative'}>
      <TabList className={'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3 md:items-start md:justify-start'}>
        <Tab>Recent</Tab>
        <Tab>Subscribed</Tab>
        <Tab>Liked</Tab>
      </TabList>
      <TabPanel>
        <RecentPlayList />
      </TabPanel>
      <TabPanel>
        <SubscribedPlaylists />
      </TabPanel>
      <TabPanel>
        <LikedPlaylists />
      </TabPanel>
    </Tabs></div>
  )
}

export default MainPage