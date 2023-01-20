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
    <main className='overflow-scroll   md:p-2'>
      <section className='grid gap-4 '>
        <h1 className='font-semibold text-xl p-2'>Recently played</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4'>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>
            
          ))}
        </div>

      </section>
      <section className='grid gap-4 mt-5'>
        <h1 className='font-semibold text-lg p-2'>Today's Hot List</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4'>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>

          ))}
        </div>

      </section>
      <section className='grid gap-4 mt-5'>
        <h1 className='font-semibold text-lg p-2'>Top Albums 2022</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4'>
          {recent.map((song, index) => (
            <div key={index}><SongCard img={song.img} songTitle={song.songTitle} artist={song.artist} /></div>

          ))}
        </div>

      </section>

    </main>
  )
}

export default Music