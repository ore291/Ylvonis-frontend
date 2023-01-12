import React from 'react'
import SongCard from './SongCard'

function Music() {

  const recent = [{
    img: 'mercy.png',
    songTitle: 'You Are God',
    artist:'Nathaniel Bassey'
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
    }
  
  ]




  return (
    <main className='overflow-scroll h-[70vh] md:h-ful mb-[5vh'>
      <section className='grid gap-4'>
        <h1 className='font-semibold text-lg p-2'>Recently played</h1>

        <div className='flex max-w-[100vw] justify-start mx-2  items-center gap-5 overflow-scroll scroll-m-0 '>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>
            
          ))}
        </div>

      </section>
      <section className='grid gap-4'>
        <h1 className='font-semibold text-lg p-2'>Today's Hot List</h1>

        <div className='flex max-w-[100vw] justify-start mx-2 justify-evnly items-center gap-5 overflow-scroll scroll-m-0 '>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>

          ))}
        </div>

      </section>
      <section className='grid gap-4'>
        <h1 className='font-semibold text-lg p-2'>Top Albums 2022</h1>

        <div className='flex max-w-[100vw] justify-start mx-2 justify-evnly items-center gap-5 overflow-scroll scroll-m-0 '>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>

          ))}
        </div>

      </section>

    </main>
  )
}

export default Music