import React from 'react'
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Notifications() {
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title='Notifications'
      nested={true}
    >
      <h1 className='text-2xl p-4 hidden md:block'>Notifications</h1>
      {/* <MainPage /> */}

    </Main>
  )
}

export default Notifications