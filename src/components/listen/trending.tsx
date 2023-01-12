import React from 'react'
import SongCard from './SongCard'

function Trending() {

  const recent = [{
    img: 'mercy.png',
    songTitle: 'You Are God',
    artist: 'Nathaniel Bassey'
  }, {
    img: 'trumphet.png',
    songTitle: 'Amazing God',
    artist: 'Mercy Chinwo'
  },
  {
    img: 'gylain.jpg',
    songTitle: 'Obinigwe',
    artist: 'Minister GUC'
  },
  {
    img: 'soll.jpg',
    songTitle: 'skater boy',
    artist: 'ava levine'
  },
  {
    img: 'austin.jpg',
    songTitle: 'skater boy',
    artist: 'roe'
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe'
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe'
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe'
    },
    {
      img: 'austin.jpg',
      songTitle: 'skater boy',
      artist: 'roe'
    },

  ]

  return (
    <main className=' h-[70vh] mb-[5vh] max-w-screen overflow-scroll mx-auto'>
      <section>
        <h1 className='font-semibold text-xl my-2  p-2'>Trending</h1>
        <div className='grid grid-cols-3 max-w-[100vw] justify-start mx-2  items-center gap-5  '>

          {recent.map((song, index) => (
            <div key={index} className=''>
              <SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} />
            </div>

          ))}
        </div>

      </section>

    </main>
    
  )
}

export default Trending