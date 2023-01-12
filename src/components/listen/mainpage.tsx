import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Music from './music';
import Trending from './trending';

function MainPage() {
  return (
    <div>
      <Tabs defaultFocus={true} selectedTabClassName={'bg-transparent focused-tab !relative'}>
        <TabList className={'bg-bgGray flex items-center justify-between w-full text-utilGray  py-1'}>
        <Tab>Music</Tab>
          <Tab>Trending</Tab>
          {/* the third page in the design didnt have anything, so i didn't do anything */}
          <Tab>Title 2</Tab>
      </TabList>

      <TabPanel>
          <Music />
      </TabPanel>
      <TabPanel>
      <Trending />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default MainPage
