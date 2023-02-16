// @ts-nocheck
import ChatArea from '@/components/chat/ChatArea'
import Contacts from '@/components/chat/Contacts'
import Loading from '@/components/utils/Loading'
import useAuth from '@/hooks/useAuth'
import { Meta } from '@/layouts/Meta'
import { chatApi, useGetContactsQuery } from '@/store/api/chat'
import { Main } from '@/templates/Main'
import { useEffect, useState, useRef } from 'react'
import { BrowserView } from 'react-device-detect'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  disconnectSocket,
  initiateSocketConnection,
  subscribeToChat,
} from '@/utils/socketinit'
import { io } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import { useAppDispatch } from '@/store/hooks'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

function Chat() {
  const isAuthenticated = useAuth(true)

  const { data: session } = useSession()

  const dispatch =  useAppDispatch()

  const [error, setError] = useState(null)

  const [users, setUsers] = useState([])
  const scrollRef = useRef()

  const socketRef = useRef()

  const [currentChat, setCurrentChat] = useState(null)

  const chatClick = (chat: any) => {
    setCurrentChat(chat)
  }

  const {
    data: contacts,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetContactsQuery(
    { page: 1, limit: 100 },
    {
      // pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
      // skip: false,
    },
  )



  useEffect(() => {
    if (!isSuccess) return
    isSuccess && setCurrentChat(contacts[0])
  }, [isSuccess])

  useEffect(() => {
    if (!currentChat && !session) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL)

    socketRef?.current?.emit(
      'join',
      { userId: session?.user.id, room: currentChat?.chatRoomId },
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
  }, [currentChat])

  useEffect(() => {

    if (!currentChat) return
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
  }, [currentChat])

  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Chat"
    >
      {isAuthenticated && (
        <main className="grid grid-cols-1 md:grid-cols-3 w-full  ">
          <div className="w-full md:border md:border-gray-700 ">
            <Tabs
              defaultFocus={true}
              selectedTabClassName={'bg-transparent focused-tab !relative'}
            >
              <TabList
                className={
                  'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3 md:items-start md:justify-start'
                }
              >
                <Tab>Chats </Tab>
                <Tab>Message Requests</Tab>
                <Tab>Calls</Tab>
              </TabList>
              <TabPanel>
                {isLoading ? (
                  <div className="w-full flex-container h-[60vh]">
                    <Loading w="5" h="5" />
                  </div>
                ) : (
                  isSuccess && (
                    <Contacts contacts={contacts} onChatClick={chatClick} />
                  )
                )}
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </Tabs>
          </div>

          <div className="md:col-span-2 ">
            <BrowserView>
              {currentChat && (
                <ChatArea currentChat={currentChat} socket={socketRef}  users={users}/>
              )}
            </BrowserView>
          </div>
        </main>
      )}
    </Main>
  )
}

export default Chat
