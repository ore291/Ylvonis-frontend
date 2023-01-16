import React,{useState} from 'react'
import Image from 'next/image'
import { BsFillPlayFill, BsHeartFill, BsUpload } from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { RiRepeat2Fill } from 'react-icons/ri'





function PostCard(props: { profileImg: string, name?: string, following?: number, time: number ,description?:string,image:string,type?:string}) {
  
  const [following, setFollowing] = useState(props.following)
  const song = {
    title: "let's go",
    artist: 'stuck in the sound',
    likes: '50',
    reposts: '230',
    comments:'160'
  }
  return (
    <div className=''>

      <div className="row-container px-2 my-2 md:my-0 gap-3">
        <div className=" relative h-16 w-16">
          <Image
            src={props.profileImg}
            alt=""
            sizes=""
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
            className="rounded-full "
          />
        </div>
        <div className="mt- flex flex-col gap-0">
          <span className="md:text-xl text-lg font-bold capitalize">{props.name}</span>
          <span className='text-sm md:text-base'>{new Date(props.time).toDateString()}</span>
        </div>
        <div className="ml-auto mr-5  flex  gap-2 cursor-pointer  text-utilGray">
          <button
            className="gradButton rounded-md !text-sm  px-2 py-1 block   capitalize"
            type="button"
            onClick={()=>setFollowing((prev)=>prev == 0 ? 1:0)}
          >
           {following === 0 ? 'followed':'follow +'}
          </button>
        </div>
      </div>



      <div className=' md:w-9/12 mx-auto text-sm text-utilGray '>
        {/* post description ,p-tag causes a weird margin */}
        <span className=' md:py-2  p-3  capitalize font-semibold text-base'>{props.description}</span>
        {/* attached image */}
        <div className='relative w-full h-[35vh] rounded-md my-3'>
          <Image src={props.image} alt='' fill style={{objectFit:'cover'}} className='rounded-md'/>
        </div>
        {/* song play or something , i dont know how to name things*/}
        <div className=' rounded-md bg-bgGray row-container w-full '>
          <div className=" row-container w-full  ">
            <div className='rounded-full  gradButton ml-3'>
              <BsFillPlayFill size={30} />
            </div>
          
            <div className='flex flex-col items-start !justify-start w-3/4  capitalize'>
              <span className='text-lg text-white font-bold truncate p-0'>{song.title}</span>
              <span className='text-utilGray text-sm  truncate'>{song.artist}</span>
            </div>

            <div >
              <SlOptionsVertical size={25} className='text-white' />
            </div>



          </div>

        </div>
        <div className="w-full flex justify-between !text-utilGray text-sm m-1 p-1">
          <div className="flex justify-start items-start gap-8 w-3/4">
            <div className='flex text-sm items-center gap-1'>
              <TfiCommentAlt />
              {song.comments}
            </div>
            <div className='flex text-sm items-center gap-1'>
              <RiRepeat2Fill />
              {song.comments}
            </div>
            <div className='flex text-sm items-center gap-1'>
              <BsHeartFill />
              {song.comments}
            </div>     
          </div>
          <div className='mr-3 py-1'>
            <BsUpload size={15}/>

          </div>
        </div>

      </div>

    </div>
  )
}

export default PostCard