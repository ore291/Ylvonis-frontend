import {  useState } from 'react'
import Image from 'next/image'
import { BsDashLg, BsHeart, BsFillHeartFill, BsPlayCircle, BsPauseCircle, BsChevronDown, BsFillPlayFill } from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'
import { TbPlaylist } from 'react-icons/tb'
import { CiShuffle, CiRepeat } from 'react-icons/ci';
import { MdSkipNext } from 'react-icons/md'


function NowPlaying() {

  const [showLarge, setShowLarge] = useState(false)
  const [favourited, setFavourited] = useState(false)
  const [isPaused, setIsPaused] = useState(false)


  // for the small player at the bottom
  const NowPlayingMini:()=>JSX.Element = () => {
    return (
      <div className='flex flex-col bg-bgGray  bottom-0 p- items-center justify-center'>
        <button className='w-full text-center md:hidden flex justify-center' onMouseDown={(e) => {
          e.preventDefault()
          setShowLarge(true)
        }}><div className='text-utilGray '><BsDashLg /> </div></button>

        <nav className='flex justify-around w-full items-center pb-1'>
          <Image src={'/ckay.png'} height={25} width={35} className='rounded' alt='' />
          <div className='flex-col flex max-w-5/12'>
            <span className='max-w-[90%] truncate'>Kiss Me Like You</span>
            <p className='text-gray-500'>ckay</p>
          </div>
          <button className=' ' onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setFavourited((prev) => !prev)
          }}>
            {favourited ? <BsFillHeartFill size={30} className='text-purple-500  ' />: <BsHeart size={30}  />}
            
            </button>
          <button onMouseDown={(e) => {
            e.preventDefault()
            setIsPaused((prev) => !prev)
          }}>{isPaused ? <BsPlayCircle size={30} className='text-purple-500' /> : <BsPauseCircle size={30} className='text-purple-700 text-whit bg-clip-text' />}</button>
          <div><SlOptionsVertical size={25}/></div>





        </nav>
        

    </div>
  )
  }


  
  const NowPlayingLarge:()=>JSX.Element = () => {
    
    return (
      <div  className='max-h-screen w-full h-full fixed top-0 left-0 bg-black z-50 md:hidden '>

        <header className='flex justify-between items-center p-3 mt-1 '>
          <button onMouseDown={(e) => {
            e.preventDefault()
            setShowLarge(false)
          }}><BsChevronDown className='text-utilGray' size={30} /></button>
         
          <div><p className='text-lg font-semibold  ' >Now playing</p></div>
          <div><TbPlaylist size={30} /></div>
        </header>
        <main className='grid gap-3'>
          <section className='mx-auto rounded h-[100%] align-top  w-[95vw] '>
            <Image src={'/ckay2.png'} alt='' fill 
              objectFit="contain" className='rounded mt-5 z-[90]  !relative' />
          </section>

          <section className='mt-3'>
            <div className='flex justify-between items-center p-3 mt-1'>
              <BsHeart size={30} />
              <div className='text-center'>
                <h1 className='font-semibold text-xl text-ellipsis'>Kiss Me Like You</h1>
                <p className='text-gray-500 pt-2'>ckay</p>
              </div>
              <div>
                <SlOptionsVertical size={25} className='rotate-90'/>
              </div>
            </div>
          </section>
          <section>
            <div className="w-full bg-gray-200 rounded h-3 mb-6">
              <div className="gradButton h-3 rounded" style={{width: '25%'}} />
            </div>
            <div className='w-full flex justify-between  items-center px-2 py-3 '>
              <div className='w-3/12'>
                <CiShuffle size={30} className='text-utilGray ' />
              </div>
              <div className='flex justify-between items-center w-6/12'>
                <div>
                  <button className='gradLink btn button rounded pointer rotate-180 text'><MdSkipNext size={45}  /></button>
                </div>
                <div className='rounded-full p-5 gradButton'>
                  <BsFillPlayFill size={30} />
                </div>
                <div>
                  <button className='gradLink btn button rounded pointer text'><MdSkipNext size={45} /></button>
                </div>
              </div>
              <div className='text-utilGray justify-self-end w-3/12 mx-auto flex justify-end items-center '>
                <CiRepeat size={30}/>
              </div>
            </div>
          </section>
        </main>
        



      </div>
    )
  }










  return (
    <div>
      
    { showLarge ? <NowPlayingLarge /> : <NowPlayingMini />}
    
    
    </div>
  )
}

export default NowPlaying