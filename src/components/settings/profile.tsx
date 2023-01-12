import React from 'react'
import Image from 'next/image'
import SuggestedPeopleCard from '../utils/SuggestedPeopleCard';
import Link from 'next/link';

function MainPage() {
  const user = {
    profileImg: "/ckay1.png",
    name: "ckay ckay",
    posts: '10',
    followers: '350',
    following: '60',
    biography:'Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.'
  };
  
  const suggestedUsers = [
    { name: 'fave', followers: '320', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'id', followers: '459', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'mercy chinwe', followers: '909', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'victony', followers: '1', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'davido', followers: '100', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'zadok', followers: '40', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'sasaki', followers: '80', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'aurora', followers: '90', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'yui', followers: '678', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay1.png',nation:'nigeria' },
    { name: 'kori', followers: '78', following: 1, img: 'ckay1.png',nation:'nigeria' },]
  return (
    <main>
      <section>
        <div className="row-container p-2 my-4  w-2/4">
          <div className=" relative h-24 w-24">
            <Image
              src={user.profileImg}
              alt=""
              sizes=""
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-full "
            />
          </div>
          <div className='flex gap-10 w-1/4 ml-auto'>

            <div className='flex flex-col justify-start gap-1'>
              <h1 className='font-bold text-white text-xl'>
                {user.posts}
              </h1>
              <span className='text-sm text-utilGray '>Posts</span>

            </div>
              <div className='flex flex-col justify-start gap-1'>
              <h1 className='font-bold text-white text-lg'>
                {user.followers}
              </h1>
              <span className='text-sm text-utilGray '>Followers</span>

            </div>
              <div className='flex flex-col justify-start gap-1'>
              <h1 className='font-bold text-white text-lg'>
                {user.following}
              </h1>
              <span className='text-sm text-utilGray '>Fllowing</span>
            </div>
          </div>
          </div>
          {/* user  name and description */}
          <div>
            <div className='p-4 flex flex-col justify-start gap-1'>
              <h1 className='capitalize font-bold text-lg !m-0'>{user.name} </h1>
              <p className='!m-0 !p-0 text-sm text-utilGray text-e'>{`"${user.biography}"`}</p>
            </div>

          </div>
         
      </section>
      <section className='grid gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-lg p-2'>Discover People</h1>
          <Link href={'/feed'}><span className='justify-end gradText underline  '>see more</span></Link>

        </div>
      

        <div className='flex max-w-[100vw] justify-start mx-2  items-center gap-5 overflow-scroll scroll-m-0 '>
          {suggestedUsers.map((suggestedUser, index) => (
            <div key={index}><SuggestedPeopleCard img={suggestedUser.img} name={suggestedUser.name} following={suggestedUser.following} nation={suggestedUser.nation } /></div>

          ))}
        </div>

      </section>

    </main>
  )
}

export default MainPage