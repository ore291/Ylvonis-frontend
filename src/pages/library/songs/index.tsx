import LikedSongs from '@/components/library/SongLibrary/liked'
import RecentSongs from '@/components/library/SongLibrary/recent'
import useAuth from '@/hooks/useAuth'
import { Meta } from '@/layouts/Meta'
import { useGetUserSongsQuery } from '@/store/api/song'
import { Main } from '@/templates/Main'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

function SongLibrary() {
  const isAuthenticated = useAuth(true)
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title="Song Library"
      nested={true}
    >
      <Tabs
        defaultFocus={true}
        selectedTabClassName={'bg-transparent focused-tab !relative'}
      >
        <TabList
          className={
            'bg-bgGray flex items-center justify-center space-x-2 text-utilGray  py-1 md:py-3 md:items-start md:justify-start'
          }
        >
          <Tab>Uploaded</Tab>
          <Tab>Liked</Tab>
        </TabList>
        <TabPanel>
          <RecentSongs />
        </TabPanel>
        <TabPanel>
          <LikedSongs />
        </TabPanel>
      </Tabs>
    </Main>
  )
}

export default SongLibrary
