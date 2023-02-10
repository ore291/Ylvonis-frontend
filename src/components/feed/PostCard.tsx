import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  BsFillHeartFill,
  BsFillPlayFill,
  BsHeart,
  BsHeartFill,
  BsUpload,
} from 'react-icons/bs'
import { SlOptionsVertical } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { RiRepeat2Fill } from 'react-icons/ri'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useSession } from 'next-auth/react'
import { intlFormatDistance } from 'date-fns'
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '@/store/api/user'
import Loading from '../utils/Loading'
import { Button } from '../UI'
import { useLikePostMutation } from '@/store/api/feed'
import Link from "next/link"

function PostCard(props: {
  post: any
  profileImg: string
  name?: string
  following?: number
  time: number
  caption?: string
  images: any
  type?: string
}) {
  const song = {
    title: "let's go",
    artist: 'stuck in the sound',
    likes: '50',
    reposts: '230',
    comments: '160',
  }

  const { data: session, status } = useSession()

  const [following, setFollowing] = useState(
    props.post.user.followers.hasOwnProperty(session?.user.id.toString()),
  )
  const [liked, setLiked] = useState(
    props.post.likes.includes(session?.user.id.toString()),
  )

  useEffect(() => {
    setFollowing(
      props.post.user.followers.hasOwnProperty(session?.user.id.toString()),
    )
    setLiked(props.post.likes.includes(session?.user.id.toString()))
  }, [])

  const [
    followUser,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowUserMutation()

  const [
    unFollowUser,
    { isLoading: unFollowingUser, isSuccess: unfollowed },
  ] = useUnFollowUserMutation()

  const [
    likePost,
    { isLoading: likingPost, isSuccess: togLiked },
  ] = useLikePostMutation()

  useEffect(() => {
    if (!followed) return
    setFollowing(true)
  }, [followed])

  useEffect(() => {
    if (!unfollowed) return
    setFollowing(false)
  }, [unfollowed])


  const toggleLike = ()=>{
    likePost(props.post.id)
    setLiked(!liked)
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  return (
    <div className="w-full border-chatGray/70 border rounded-md p-2">
      <div className="w-full flex items-center justify-between  border-b  border-chatGray/70 pb-2 my-2 md:my-0 ">
        <div className="flex space-x-3 items-center">
          <div className=" relative h-12 w-12 md:h-16 md:w-16">
            <Image
              src={props.profileImg}
              alt=""
              sizes=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
              className="rounded-full "
            />
          </div>
          <div className="flex flex-col gap-0">
            <Link href={`/profile/${props.post.user.username}`}> <span className="cursor-pointer hover:underline  text-lg font-medium capitalize hover:text-brand">
              {props.post.user.username}
            </span>
            </Link>
           
            <span className="text-xsm text-utilGray font-light ">
              {intlFormatDistance(new Date(props.post.posted_at), new Date())}
            </span>
          </div>
        </div>
        {props.post.user.id.toString() !== session?.user.id.toString() ? (
          <div className="  flex  gap-2 cursor-pointer  text-utilGray">
            {following ? (
              <button
                className="gradButton rounded-md !text-sm min-w-[80px] h-8 px-2 py-1 block   capitalize"
                type="button"
                onClick={() => unFollowUser(props.post.user.id)}
                disabled={unFollowingUser}
              >
                {unFollowingUser ? <Loading /> : 'followed'}
              </button>
            ) : (
              <button
                className="gradButton rounded-md !text-sm min-w-[80px] h-8  px-2 py-1 block   capitalize"
                type="button"
                onClick={() => followUser(props.post.user.id)}
                disabled={followingUser}
              >
                {followingUser ? <Loading /> : 'follow +'}
              </button>
            )}
          </div>
        ) : null}
      </div>
      <div className="md:ml-16 max-w-xl  text-sm text-utilGray ">
        {/* post caption ,p-tag causes a weird margin */}
        <span className="  my-7  p-3   font-medium text-white/80 text-base">
          {props.caption}
        </span>
        {/* attached image */}
        {props.post.post_files.length > 0 ? (
          <Carousel showDots={true} arrows={false} responsive={responsive}>
            {props.post.post_files.map((file: any, i: number) =>
              props.post.post_type == 'image' ? (
                <div>
                  <div className="w-full relative h-[400px]" key={i}>
                    <Image
                      className="object-cover"
                      fill
                      alt=""
                      src={file.url}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full relative h-auto" key={i}>
                  <video src={file.url} width="320" height="240" controls />
                </div>
              ),
            )}
          </Carousel>
        ) : null}

        {/* <div className=" rounded-md bg-bgGray row-container w-full ">
          <div className=" row-container w-full  ">
            <div className="rounded-full  gradButton ml-3">
              <BsFillPlayFill size={30} />
            </div>

            <div className="flex flex-col items-start !justify-start w-3/4  capitalize">
              <span className="text-lg text-white font-bold truncate p-0">
                {song.title}
              </span>
              <span className="text-utilGray text-sm  truncate">
                {song.artist}
              </span>
            </div>

            <div>
              <SlOptionsVertical size={25} className="text-white" />
            </div>
          </div>
        </div> */}
        <div className="w-full flex justify-between !text-utilGray text-sm m-1 p-1">
          <div className="flex justify-start items-start gap-8 w-3/4">
            <div className="flex text-sm items-center gap-1">
              <TfiCommentAlt size={15} />
              {song.comments}
            </div>
            <div className="flex text-sm items-center gap-1">
              <RiRepeat2Fill size={15} />
              {song.comments}
            </div>
            <button disabled={likingPost} className="flex text-sm items-center gap-1 cursor-pointer" onClick={()=>toggleLike()}>
              {liked ? (
                <BsFillHeartFill size={15} className="text-brand  " />
              ) : (
                <BsHeart size={15} />
              )}
              {props.post.likes.length}
            </button>
          </div>
          <div className="mr-3 py-1">
            <BsUpload size={15} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
