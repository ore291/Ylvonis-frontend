//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiOutlinePicture } from 'react-icons/ai'
import PostCard from './PostCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import ArtistsFeedItem from '../utils/ArtistsFeedItem'
import { TiVideo } from 'react-icons/ti'
import { MdClose, MdMusicVideo } from 'react-icons/md'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useCreatePostMutation, useGetUserFeedQuery } from '@/store/api/feed'
import ArtistList from './ArtistList'
import UserList from './UserList'

function MainPage() {
  const { data, error, isLoading } = useGetUserFeedQuery(1)
  const [
    createPost,
    { isLoading: creatingPost, isSuccess },
  ] = useCreatePostMutation()

  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const [caption, setCaption] = useState('')
  const [fileType, setFileType] = useState<string>()
  const [files, setFiles] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('caption', caption)

    if (files.length > 0) {
      files.forEach((file, i) => {
        formData.append(`files`, file)
      })
      formData.append('post_type', fileType)
    }
    // const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}posts`, formData)
    // console.log(res);
    createPost(formData)
  }

  useEffect(() => {
    if (!isSuccess) return

    if (isSuccess) {
      setCaption('')
      setFiles([])
      setFileType('')
    }
  }, [isSuccess])

  const handleImageClick = () => {
    // 👇️ open file input box on click of other element
    if (imageInputRef != null) {
      imageInputRef?.current.click()
    }
  }

  const deleteByIndex = (index) => {
    if (files.length > 1) {
      setFiles((oldValues) => {
        return oldValues.filter((_, i) => i !== index)
      })
    } else {
      setFiles([])
    }
  }

  const handleVideoClick = () => {
    // 👇️ open file input box on click of other element
    if (imageInputRef != null) {
      videoInputRef?.current.click()
    }
  }

  const handleFileChange = (
    event: React.FormEvent<HTMLInputElement>,
    type: string,
  ) => {
    const files = event?.target?.files && event.target.files

    if (!files) {
      return
    }
    setFileType(type)
    setFiles(Array.from(files))
  }

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
  ]
  const users = [
    { name: 'fave', followers: '320', following: 1, img: 'ckay2.png' },
    { name: 'id', followers: '459', following: 1, img: 'cool.png' },
    { name: 'mercy', followers: '909', following: 1, img: 'trumphet.png' },
    { name: 'victor anthony', followers: '1', following: 1, img: 'mercy.png' },
    { name: 'david', followers: '100', following: 1, img: 'gylain.jpg' },
    { name: 'jide', followers: '40', following: 1, img: 'beats.png' },
    { name: 'kunle alake', followers: '80', following: 1, img: 'ckay2.png' },
    { name: 'cyrill', followers: '90', following: 1, img: 'ckay2.png' },
    { name: 'pator', followers: '678', following: 1, img: 'ckay2.png' },
    { name: 'mudill', followers: '78', following: 1, img: 'ckay2.png' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      <section className="md:col-span-2  w-full  ">
        <div className="col-container divide-y divide-chatGray  border border-chatGray">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex   w-full bg-bgGray   items-center px-1 "
          >
            <BiEdit size={30} />

            <input
              value={caption}
              onChange={(e) => setCaption(e.currentTarget.value)}
              type="text"
              id="email-address-icon"
              className="flex-1 border-0  bg-bgGray   text-sm  focus:ring-0 focus:border-0 block w-full h-[60px] text-utilGray "
              placeholder="Create a post"
            />
            <button
              className="gradButton rounded-md w-20 !text-sm  px-2 py-1 block   capitalize"
              type="submit"
              disabled={creatingPost}
            >
              {creatingPost ? 'Loading...' : 'Post'}
            </button>
          </form>

          <div className="w-full bg-bgGray p-3  flex justify-around items-center ">
            <div
              onClick={() => handleImageClick()}
              className="cursor-pointer text-utilGray flex text-base items-center gap-3 capitalize font-semibold"
            >
              <AiOutlinePicture size={25} />
              picture
            </div>
            <div
              onClick={() => handleVideoClick()}
              className="cursor-pointer text-utilGray flex text-base items-center gap-3 capitalize font-semibold"
            >
              <TiVideo size={25} />
              video
            </div>
            <div className="cursor-pointer text-utilGray flex text-base items-center gap-3 capitalize font-semibold">
              <MdMusicVideo size={25} />
              music
            </div>
          </div>

          <input
            type="file"
            name="image"
            id="image"
            accept="capture=camera,image/*"
            multiple
            hidden
            onChange={(e) => handleFileChange(e, 'image')}
            ref={imageInputRef}
          />
          <input
            type="file"
            name="video"
            id="video"
            hidden
            onChange={(e) => handleFileChange(e, 'video')}
            accept="capture=camera,video/*"
            ref={videoInputRef}
          />
        </div>

        <div className="grid grid-cols-2  gap-2 my-2">
          {files.length > 0 ? (
            <>
              {fileType == 'image'
                ? files.map((image, i) => (
                    <div className="w-full relative h-80 " key={i}>
                      <div
                        onClick={() => deleteByIndex(i)}
                        className="absolute right-1 top-1 z-10 p-1 flex items-center justify-center rounded-full bg-white  cursor-pointer"
                      >
                        <MdClose className="h-3 w-3 text-brand " />
                      </div>
                      <Image
                        className="object-cover"
                        fill
                        alt=""
                        src={URL.createObjectURL(image)}
                      />
                    </div>
                  ))
                : files.map((video, i) => (
                    <div className="w-full relative h-auto" key={i}>
                      <div
                        onClick={() => deleteByIndex(i)}
                        className="absolute right-1 top-1 z-10 p-1 flex items-center justify-center rounded-full bg-white  cursor-pointer"
                      >
                        <MdClose className="h-3 w-3 text-brand " />
                      </div>
                      <video
                        src={URL.createObjectURL(video)}
                        width="320"
                        height="240"
                        controls
                      />
                    </div>
                  ))}
            </>
          ) : null}
        </div>

        {/* main feed area */}

        <div className="mt-4  max-h-[80vh] pb-[100px] overflow-scroll">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-endBrand fill-brand"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:px-5 gap-5">
              {data?.posts?.length > 0 ? (
                data.posts.map((post, i) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    profileImg="/ckay2.png"
                    name={post.user.username}
                    following={1}
                    time={new Date().getTime()}
                    caption={post.caption}
                    images={post.post_files}
                  />
                ))
              ) : (
                <p className="text-center text-xl font-semibold text-brand">
                  No new posts
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* suggested artists/users */}
      <section className="border border-chatGray   ">
        <Tabs
        className="min-h-fit"
          defaultFocus={true}
          selectedTabClassName={'bg-transparent focused-tab !relative'}
        >
          <TabList
            className={
              'bg-bgGray h-full flex items-center justify-between text-utilGray whitespace-nowrap py-1 md:py-3 md:items-start md:justify-start'
            }
          >
            <Tab>Suggested Artists </Tab>
            <Tab>Suggested Users</Tab>
          </TabList>
          <div className="bg-bgGray p-2">
            <TabPanel>
              <ArtistList />
            </TabPanel>
            <TabPanel>
              <UserList />
            </TabPanel>
          </div>
        </Tabs>
      </section>
    </div>
  )
}

export default MainPage
