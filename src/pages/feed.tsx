import React from 'react'
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Feed() {
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title='Feed'
    >

    </Main>
  )
}

export default Feed