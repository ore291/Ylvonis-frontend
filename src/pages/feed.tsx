import React from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import MainPage from '@/components/feed'

function Feed() {
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title="Feed"
    >
      <MainPage />
    </Main>
  )
}

export default Feed
