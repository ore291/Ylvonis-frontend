// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { useRouter } from 'next/router'
import ChatArea from '@/components/chat/ChatArea'
import { chatApi, useGetRoomByIdQuery } from '@/store/api/chat'
import { io } from 'socket.io-client'
import Loading from '@/components/utils/Loading'
import { useSession } from 'next-auth/react'
import { useAppDispatch } from '@/store/hooks'
import useAuth from '@/hooks/useAuth'

function Chat() {

  const authenticated = useAuth(true)
  const router = useRouter()
  const { chatId } = router.query
  const {data : session} = useSession()

  const [roomId, setChatRoomId] = useState<
    String | null | undefined | String[]
  >(router?.query?.chatId)

  useEffect(() => {
    if (!router.isReady) return
    setChatRoomId(router?.query?.chatId)
  }, [router.isReady])

  const {
    data: chat,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useGetRoomByIdQuery(roomId, {
    // pollingInterval: 10000,
    // refetchOnMountOrArgChange: true,
    skip: !roomId,
  })
  const [users, setUsers] = useState([])

  const socketRef = useRef()

  const dispatch = useAppDispatch()

  const [error, setError] = useState(null)

  useEffect(() => {
    if (!roomId || !session) return
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_URL)

    socketRef?.current?.emit(
      'join',
      { userId: session?.user.id, room: roomId },
      (error) => {
        if (error) {
          console.log(error)
          setError(error)
        }
      },
    )

    return () => {
      socketRef?.current?.disconnect()
    }
  }, [roomId])

  useEffect(() => {
    socketRef?.current?.on('new message', (message) => {
      const mes = message.message
  
      try {
        dispatch(
          chatApi.util.updateQueryData(
            'getChatByRoom',
            mes?.chatRoomId,
            (draft) => {
              draft?.push(mes)
            },
          ),
        )
      } catch {
        ;(error) => console.log(error)
      }
    })

    socketRef?.current?.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [roomId])

  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Chat"
     
    >
      {isLoading ? (
        <div className="h-[60vh] w-full flex-container">
          <Loading w="4" h="4" />
        </div>
      ) : chat && (
        <div className="  py-2">
          <div className={` max-h-full w-full h-full   bg-black  `}>
            <ChatArea
              currentChat={{ chatRoomId: chatId, otherUser: chat.otherUser }}
              socket={socketRef}
              users={users}
            />
          </div>
        </div>
      )}
    </Main>
  )
}

export default Chat
