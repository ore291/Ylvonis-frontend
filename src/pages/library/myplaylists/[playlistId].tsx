import React from 'react'
import { useRouter } from 'next/router';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import MainPage from '@/components/library/Myplaylist/playlist/mainpage';


function Playlist() {
  const router = useRouter()
  const { playListId } = router.query
  const playlists: { img: string, name: string }[] = [
    { img: 'Cool.png', name: 'gospel' },
    { img: 'cool.png', name: 'Cool Music' },
    { img: 'beats.png', name: 'Beats' },
    { img: 'praise.png', name: 'Worships' },
    { img: 'worship.png', name: 'Worships' },
  ]


  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title='playlist'
      nested={true}
    >
      <div>
        <MainPage img='mercy.png' />
        
</div>

    </Main>
  )
}

export default Playlist