import ArtististsListItem from '@/components/utils/ArtististsListItem';
import React from 'react'
import { BsListUl } from 'react-icons/bs';

function FollowedArtists() {
  const numOfArtists = 50;
  const artists = [
    { name: 'fave', followers: '320', following: 0, img: 'ckay1.png' },
    { name: 'id', followers: '459', following: 0, img: 'ckay1.png' },
    { name: 'mercy chinwe', followers: '909', following: 0, img: 'ckay1.png' },
    { name: 'victony', followers: '1', following: 0, img: 'ckay1.png' },
    { name: 'davido', followers: '100', following: 0, img: 'ckay1.png' },
    { name: 'zadok', followers: '40', following: 0, img: 'ckay1.png' },
    { name: 'sasaki', followers: '80', following: 0, img: 'ckay1.png' },
    { name: 'aurora', followers: '90', following: 0, img: 'ckay1.png' },
    { name: 'yui', followers: '678', following: 0, img: 'ckay1.png' },
    { name: 'kori', followers: '78', following: 0, img: 'ckay1.png' },
    { name: 'kori', followers: '78', following: 0, img: 'ckay1.png' },
    { name: 'kori', followers: '78', following: 0, img: 'ckay1.png' },]
  return (
    <main>
      <section>
        <nav className="flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">{numOfArtists} artists </div>
          <button>
            {" "}
            <BsListUl size={30} className="text-utilGray" />{" "}
          </button>
        </nav>
      </section>
      <section className="max-h-[60vh] mt-2 overflow-scroll mb-10">
        <div className='md:grid md:grid-cols-5'>
          {artists.map((artist, index) => (
            <div key={index}>
              <ArtististsListItem name={artist.name} followers={artist.followers} following={artist.following} img={artist.img} />
            </div>

          ))}
        </div>
      </section>
    </main>
  )
}

export default FollowedArtists