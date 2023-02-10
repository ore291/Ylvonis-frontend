import ArtistsCard from '@/components/utils/ArtistsCard';
import React from 'react'
import { BsListUl } from 'react-icons/bs';

function LikedArtists() {
  const numOfArtists = 50;
  const artists = [
    { name: 'fave', followers: '320', following: 1, img: 'ckay2.png' },
    { name: 'id', followers: '459', following: 1, img: 'ckay2.png' },
    { name: 'mercy chinwe', followers: '909', following: 1, img: 'ckay2.png' },
    { name: 'victony', followers: '1', following: 1, img: 'ckay2.png' },
    { name: 'davido', followers: '100', following: 1, img: 'ckay2.png' },
    { name: 'zadok', followers: '40', following: 1, img: 'ckay2.png' },
    { name: 'sasaki', followers: '80', following: 1, img: 'ckay2.png' },
    { name: 'aurora', followers: '90', following: 1, img: 'ckay2.png' },
    { name: 'yui', followers: '678', following: 1, img: 'ckay2.png' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay2.png' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay2.png' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay2.png' },]
  return (
    <main>
      <section>
        <nav className="flex w-full justify-between p-4 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">{numOfArtists} artists </div>
          <button>
            {" "}
            <BsListUl size={30} className="text-utilGray" />{" "}
          </button>
        </nav>
      </section>
      <section className=" mt-2 mb-10 p-2">
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {artists.map((artist, index) => (
            <div key={index}>
              <ArtistsCard name={artist.name} followers={artist.followers} following={artist.following} img={artist.img} />
            </div>

          ))}
        </div>
      </section>
    </main>
  )
}

export default LikedArtists