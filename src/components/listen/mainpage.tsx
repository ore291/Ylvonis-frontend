import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Music from './music';
import Podcasts from './podcasts';
import Trending from './trending';

function MainPage() {
  return (
    <div>
      <Tabs defaultFocus={true} selectedTabClassName={'bg-transparent focused-tab !relative'}>
        <TabList className={'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3 md:items-start md:justify-start'}>
        <Tab>Music</Tab>
          <Tab>Trending</Tab>
          {/* the third page in the design didnt have anything, so i didn't do anything */}
          <Tab>Podcasts</Tab>
      </TabList>

      <TabPanel>
          <Music />
      </TabPanel>
      <TabPanel>
      <Trending />
        </TabPanel>
        <TabPanel>
            <Podcasts />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default MainPage
