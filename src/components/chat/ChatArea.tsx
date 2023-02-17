// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react'
import { MessageBox } from 'react-chat-elements'
import { toast } from 'react-toastify'
import Image from 'next/image'
import {
  chatApi,
  useDeleteMediaMutation,
  useGetChatByRoomQuery,
  useSendMessageMutation,
  useUploadMutation,
} from '@/store/api/chat'
import Message from './Message'
import { useSession } from 'next-auth/react'
import { fullBrowserVersion } from 'react-device-detect'
import Loading from '../utils/Loading'
import { RiSendPlaneFill } from 'react-icons/ri'
import dynamic from 'next/dynamic'
import { io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { Progress } from 'flowbite-react'
import { MdClose } from 'react-icons/md'
import { setUploadProgress } from '@/store/slices/search'

const InputEmoji = dynamic(
  () => {
    return import('react-input-emoji')
  },
  { ssr: false },
)

// chat area componenet
//didn't define type cause it was throwing typescript error cause i don't know how to use it well
function ChatArea({
  currentChat,

  users,
}: {
  currentChat: any
  socket: any
  users: any
}) {
  const { data: session } = useSession()

  const progress = useAppSelector((state) => state.search.uploadProgress)

  const [error, setError] = useState(null)

  const scrollRef = useRef()

  const mediaRef = useRef()

  const [file, setFile] = useState(null)
  const [uploadField, setUploadField] = useState(false)
  const [fileData, setFileData] = useState({
    post_file: '',
    post_file_id: '',
    type: '',
  })

  const [uploadMedia, { isSuccess: uploaded, data: res }] = useUploadMutation()
  const handleUpload = async (e: InputEvent) => {
    e.preventDefault()

    setUploadField(true)

    const uploadFile = e.currentTarget.files[0]

    if (uploadFile) {
      setFile(uploadFile.name)

      setFileData({ ...fileData, type: uploadFile.type.split('/')[0] })

      const formData = new FormData()

      formData.append('file', uploadFile)

      // these are args passed to the queryFn
      await uploadMedia({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/upload`,
        data: formData,
      })
    }
  }

  useEffect(() => {
    if (!uploaded) return

    setFileData({
      ...fileData,
      post_file: res.fileUrl,
      post_file_id: res.fileId,
    })
  }, [uploaded])

  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()

  const {
    data: messages,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useGetChatByRoomQuery(currentChat.chatRoomId, {
    // pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
    // skip: false,
  })

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const [
    sendMessage, // This is the mutation trigger
    { isLoading: isUpdating, isSuccess: posted, data: result }, // This is the destructured mutation result
  ] = useSendMessageMutation()

  const [
    deleteMedia, // This is the mutation trigger
    { isLoading: isDeleting, isSuccess: deleted }, // This is the destructured mutation result
  ] = useDeleteMediaMutation()

  useEffect(() => {
    if (!posted) return

    const patchCollection = dispatch(
      chatApi.util.updateQueryData('getChatByRoom', undefined, (draftPosts) => {
        draftPosts.push(result.post)
      }),
    )
  }, [posted])

  const handleSubmit = () => {
    let roomId = currentChat.chatRoomId

    if (file && fileData.post_file === '') {
      return toast.error('File upload in progress')
    }

    if (file !== null) {
      // const formData = new FormData()
      // Object.entries(fileData).forEach((entry) => {
      //   const [key, value] = entry

      //   formData.append(key, value)
      // })

      sendMessage({ roomId, message, fileData: fileData })
      setUploadField(false)
    } else {
      const formData = new FormData()
      sendMessage({ roomId, message, fileData: {} })
    }

    setMessage('')
  }

  const handleDelete = () => {
    deleteMedia(fileData.post_file_id)
    setFile(null)
    setFileData({ post_file: '', post_file_id: '', type: '' })
    setUploadField(false)
    dispatch(setUploadProgress(0))
  }

  return (
    <div className="flex  flex-col md:block bg-[#202020]">
      {/* Header */}
      <div className="px-1 py-3  md:px-3 w-full border border-gray-700 border-l-0  flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-10 w-10 bg-white rounded-full">
            {/* didnt use next-image cause it wasnt working with external images ,but i guess you can change it */}
            <Image
              alt=""
              className="w-10 h-10 rounded-full"
              fill
              src={currentChat.otherUser.profile_pic}
            />
          </div>
          <div className="ml-4">
            <Link href={`/profile/${currentChat.otherUser.username}`}>
              <p className="font-semibold text-lg text-white capitalize">{`${currentChat.otherUser.firstname} ${currentChat.otherUser.lastname}`}</p>
            </Link>
            {/* used for the online/offline status */}
            <p className="text-utilGray font-light text-xs mt-1 ">
              {users && users.length > 1 ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        {/* ignore this for now ,they are for icons  */}
        <div className="flex-container space-x-5">
          <button>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.63889 12.1256C7.87889 16.5278 11.48 20.1289 15.89 22.3689L19.3122 18.9389C19.74 18.5111 20.3544 18.3867 20.8911 18.5578C22.6333 19.1333 24.5078 19.4444 26.4444 19.4444C27.3078 19.4444 28 20.1367 28 21V26.4444C28 27.3078 27.3078 28 26.4444 28C11.8378 28 0 16.1622 0 1.55556C0 0.692222 0.7 0 1.55556 0H7C7.86333 0 8.55556 0.692222 8.55556 1.55556C8.55556 3.49222 8.86667 5.36667 9.44222 7.10889C9.61333 7.64556 9.48889 8.26 9.06111 8.68778L5.63889 12.1256Z"
                fill="url(#paint0_linear_567_1628)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_567_1628"
                  x1="-7.5"
                  y1="-9.90661e-07"
                  x2="32"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <button className="">
            <svg
              width="33"
              height="24"
              viewBox="0 0 33 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.2536 3.684C32.0021 3.51429 31.7161 3.42857 31.4286 3.42857C31.1881 3.42857 30.9477 3.48857 30.7261 3.60857L26.7143 5.79771V5.14286C26.7143 2.30743 24.5991 0 22 0H4.71429C2.11514 0 0 2.30743 0 5.14286V18.8571C0 21.6926 2.11514 24 4.71429 24H22C24.5991 24 26.7143 21.6926 26.7143 18.8571V18.2023L30.7261 20.3897C30.9477 20.5114 31.1881 20.5714 31.4286 20.5714C31.7161 20.5714 32.0021 20.4857 32.2536 20.316C32.7171 20.0023 33 19.452 33 18.8571V5.14286C33 4.548 32.7171 3.99771 32.2536 3.684ZM7.85714 14.5714C6.55443 14.5714 5.5 13.4211 5.5 12C5.5 10.5789 6.55443 9.42857 7.85714 9.42857C9.15986 9.42857 10.2143 10.5789 10.2143 12C10.2143 13.4211 9.15986 14.5714 7.85714 14.5714Z"
                fill="url(#paint0_linear_567_1629)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_567_1629"
                  x1="-1.92598e-06"
                  y1="-4"
                  x2="33"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <button className="">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 28.1042L22.6387 21.7114C27.2058 16.6217 26.8388 8.80377 21.7416 4.20261C16.6444 -0.398546 8.81513 0.00863606 4.20728 5.09841C-0.400583 10.1882 0.00719237 18.0061 5.10438 22.6072C9.83457 26.8827 17.0522 26.8827 21.7824 22.6072L28.1845 29L29 28.1042ZM13.423 24.5617C7.26559 24.5617 2.24996 19.5534 2.24996 13.4049C2.24996 7.21576 7.26559 2.24814 13.423 2.24814C19.5804 2.24814 24.596 7.25648 24.596 13.4049C24.596 19.5534 19.5804 24.5617 13.423 24.5617Z"
                fill="url(#paint0_linear_567_1630)"
                stroke="url(#paint1_linear_567_1630)"
              />
              <path
                d="M13.4229 3.91748V5.13903C17.9899 5.13903 21.7007 8.84438 21.7007 13.4048H22.924C22.924 8.15217 18.6831 3.91748 13.4229 3.91748Z"
                fill="url(#paint2_linear_567_1630)"
                stroke="url(#paint3_linear_567_1630)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_567_1630"
                  x1="-1"
                  y1="1.99835e-07"
                  x2="32"
                  y2="30.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_567_1630"
                  x1="15"
                  y1="1"
                  x2="15"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_567_1630"
                  x1="12.7442"
                  y1="3.57865"
                  x2="23.927"
                  y2="13.9293"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_567_1630"
                  x1="18.1734"
                  y1="3.91748"
                  x2="18.1734"
                  y2="13.4048"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <button>
            <svg
              width="34"
              height="8"
              viewBox="0 0 34 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0001 8C14.7203 8 12.865 6.20533 12.865 4C12.865 1.79467 14.7203 0 17.0001 0C19.28 0 21.1353 1.79467 21.1353 4C21.1353 6.20533 19.28 8 17.0001 8Z"
                fill="url(#paint0_linear_567_1640)"
              />
              <path
                d="M4.13537 8C1.85553 8 0.000237465 6.20533 0.000237465 4C0.000237465 1.79467 1.85553 0 4.13537 0C6.41521 0 8.27051 1.79467 8.27051 4C8.27051 6.20533 6.41521 8 4.13537 8Z"
                fill="url(#paint1_linear_567_1640)"
              />
              <path
                d="M29.8649 8C27.585 8 25.7297 6.20533 25.7297 4C25.7297 1.79467 27.585 0 29.8649 0C32.1447 0 34 1.79467 34 4C34 6.20533 32.1447 8 29.8649 8Z"
                fill="url(#paint2_linear_567_1640)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_567_1640"
                  x1="13.1082"
                  y1="-12"
                  x2="27.31"
                  y2="-9.08071"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_567_1640"
                  x1="0.243481"
                  y1="-12"
                  x2="14.4453"
                  y2="-9.08071"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_567_1640"
                  x1="25.973"
                  y1="-12"
                  x2="40.1748"
                  y2="-9.08071"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      {/* Messages */}
      {isLoading ? (
        <div className="h-[55vh] md:h-[20rem] w-full flex-container">
          <Loading w="3" h="3" />
        </div>
      ) : (
        <div className="relative w-full p-6 overflow-y-scroll h-[55vh] md:h-[20rem] scrollbar-hide border-b border-gray-700 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) =>
                message.message !== '' ? (
                  message.type == 'text' ? (
                    <div key={index} ref={scrollRef}>
                      <MessageBox
                        className="child:!bg-chatGray child:!text-white child:!capitalize"
                        position={
                          session?.user?.id !=
                          (message.postedByUser.id
                            ? message.postedByUser.id
                            : message.postedByUser._id)
                            ? 'left'
                            : 'right'
                        }
                        type={'text'}
                        date={message.createdAt}
                        text={message.message.messageText}
                        notch={true}
                      />
                    </div>
                  ) : message.type == 'image' ? (
                    <div key={index} ref={scrollRef}>
                      <MessageBox
                        className="child:!bg-chatGray child:!text-white child:!capitalize"
                        position={
                          session?.user?.id !=
                          (message.postedByUser.id
                            ? message.postedByUser.id
                            : message.postedByUser._id)
                            ? 'left'
                            : 'right'
                        }
                        type={'photo'}
                        date={message.createdAt}
                        text={message.message.messageText}
                        data={{
                          width: 230,
                          height: 180,
                          uri: message.post_file,
                          status: {
                            click: true,
                            download: true,
                            loading: 0,
                          },
                        }}
                        notch={true}
                      />
                    </div>
                  ) : (
                    <>
                      {message.type == 'audio' ? (
                        <div key={index} ref={scrollRef}>
                          <MessageBox
                            className="child:!bg-chatGray child:!text-white child:!capitalize"
                            position={
                              session?.user?.id !=
                              (message.postedByUser.id
                                ? message.postedByUser.id
                                : message.postedByUser._id)
                                ? 'left'
                                : 'right'
                            }
                            data={{
                              audioURL: message.post_file,
                              status: {
                                click: true,
                                download: true,
                                loading: 0.5,
                              },
                            }}
                            
                            type={'audio'}
                            date={message.createdAt}
                            text={message.message.messageText}
                            notch={true}
                          />
                        </div>
                      ) : (
                        <div key={index} ref={scrollRef}>
                          <MessageBox
                            className="child:!bg-chatGray child:!text-white child:!capitalize"
                            position={
                              session?.user?.id !=
                              (message.postedByUser.id
                                ? message.postedByUser.id
                                : message.postedByUser._id)
                                ? 'left'
                                : 'right'
                            }
                            data={{
                              videoURL: message.post_file,
                              status: {
                                click: true,
                                download: true,
                                loading: 0.5,
                              },
                            }}
                            type={message.type}
                            date={message.createdAt}
                            text={message.message.messageText}
                            notch={true}
                          />
                        </div>
                      )}
                    </>
                  )
                ) : null,
              )}
          </ul>
        </div>
      )}
      {uploadField && (
        <div className=" p-2 relative">
          <div
            onClick={() => handleDelete()}
            className="absolute right-3 transform transition-all cursor-pointer hover:scale-105  -top-7  flex-container rounded-full p-1 bg-white shadow-lg"
          >
            <MdClose className="w-5 h-5 text-red-500 " />
          </div>

          <Progress
            progress={progress}
            color="purple"
            label={`${progress < 100 ? 'Uploading...' : file ? file : ''}`}
            labelPosition="outside"
            labelProgress={true}
          />
        </div>
      )}

      {/* Input */}
      <div className="bg-grey-lighter px-4 py-4 flex items-center relative">
        <div className="flex items-center space-x-2">
          <button onClick={() => mediaRef.current.click()}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 0C9.84844 0 0 9.84844 0 22C0 34.1516 9.84844 44 22 44C34.1516 44 44 34.1516 44 22C44 9.84844 34.1516 0 22 0ZM30.25 24.0625H24.0625V30.25C24.0625 31.3844 23.1344 32.3125 22.0773 32.3125C20.8656 32.3125 19.9375 31.3844 19.9375 30.25V24.0625H13.75C12.6156 24.0625 11.6875 23.1344 11.6875 22C11.6875 20.8656 12.6156 19.9375 13.75 19.9375H19.9375V13.75C19.9375 12.6156 20.8656 11.6875 22 11.6875C23.1344 11.6875 24.0625 12.6156 24.0625 13.75V19.9375H30.25C31.3844 19.9375 32.3125 20.8656 32.3125 22C32.3125 23.1344 31.3844 24.0625 30.25 24.0625Z"
                fill="url(#paint0_linear_595_319)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_595_319"
                  x1="44"
                  y1="0"
                  x2="0"
                  y2="44"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BC238B" />
                  <stop offset="1" stopColor="#A823BC" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <input
            type="file"
            hidden
            onChange={(e) => handleUpload(e)}
            ref={mediaRef}
            accept="audio/*,video/*,image/*"
          />
        </div>

        <div className="flex-1 mx-2 ">
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleSubmit}
            className="w-full !text-white bg-[#343434] border border-gray-700 focus:ring-0 focus:border-0 rounded-xl px-2 py-2"
            placeholder="Type a message"
          />
        </div>
        <button onClick={() => handleSubmit()}>
          <RiSendPlaneFill className="text-brand w-8 h-8 " />
        </button>
      </div>
    </div>
  )
}

export default ChatArea
