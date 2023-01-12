import React from 'react'
import MainPage from '@/components/library/Myplaylist/mainpage'
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function MyPlaylist() {
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title='My Playlists'
      nested={true}
    >
      <MainPage />

    </Main>
  )
}

export default MyPlaylist