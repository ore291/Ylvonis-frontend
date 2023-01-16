import React from 'react'
import Image from 'next/image'
import { BsFillPlayFill, BsDisc } from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'


function MainPage(props:{img:string}) {

  const songs = [{ title: 'Ancient Words', artist: 'Michael W. Smit' }, { title: 'All Hail the Power', artist: 'bishop' }, { title: 'again', artist: 'yui' }, { title: 'end', artist: 'band' },]
  return (
    <main>
      {/* desktop plylist view,i had an idea but i decided not to do it  */}
      <section className='hidden md:block'>
       
      </section>
      {/* mobile playlist view */}
      <section className='md:hidden'>
        <div className=' grid grid-cols-2  w-full gap-4 p-3 '>
          <div>
            <div className='relative h-36 w-auto'>
              <Image src={`/${props.img}`} alt={''} fill className='' />
            </div>
          </div>
          <div className='flex flex-col gap-3 items-baseline align-bottom  pt-6'>
            <h1 className='font-bold text-xl '>
              Gospel
            </h1>
            <span className='text-utilGray'>
              Gospel music, to me, has
              always been a balm for
              the soul.
            </span>
          </div>
          <div>
          </div>
        </div>
        <div className="row-container border-y-[0.5px] py-3 border-solid border-utilGray  w-full">
          <div className='text-utilGray text-md w-2/4'>
            3 songs
          </div>
          <div className='w-2/4 row-container'>
            <button className=' flex p-2 text-sm rounded-md gradButton capitalize'>
              play all
              <BsFillPlayFill size={30} />
            </button>
            <div>
              <SlOptionsVertical size={25} className='' />
            </div>
          </div>
        </div>
        <div className=''>
          {songs.map((song,index) => (
            <div className="row-container w-full border-y-[0.5px] border-utilGray border-solid py-2 " key={index}>
              <BsDisc size={30} className='w-1/4' />
              <div className='flex flex-col items-start !justify-start w-2/4 gap-1 capitalize'>
                <span className='text-xl font-bold truncate '>{song.title}</span>
                <span className='text-utilGray text-sm  truncate'>{song.artist }</span>
             </div>
             
               <div className='rounded-full  gradButton'>
                  <BsFillPlayFill size={30} />
                </div>

            

            </div>
          ))}


        </div>
      </section>


    </main>
  )
}

export default MainPage