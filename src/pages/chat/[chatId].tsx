import React from 'react'
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { useRouter } from 'next/router'
import ChatArea from '@/components/chat/ChatArea'
import { ChatTypes } from '@/components/chat/mainpage'

function Chat() {
  const router = useRouter()
  const { chatId } = router.query
  const chats: ChatTypes[] = [{
    img: 'http://localhost:3000/_next/image/?url=%2Fckay.png&w=96&q=75',
    name: ' ckay',
    messages: [{
      message: 'hi!',
      status: 'sent'

    }, {
      message: 'hi',
      status: 'received'

    },
    {
      message: 'hello',
      status: 'received'

    },
    {
      message: 'listen to my song',
      status: 'received'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },],
    date: new Date(),

  },
  {
    img: 'http://localhost:3000/_next/image/?url=%2Fckay.png&w=96&q=75',
    name: ' ckay',
    messages: [{
      message: 'hi!',
      status: 'sent'

    }, {
      message: 'hi',
      status: 'received'

    },
    {
      message: 'hello',
      status: 'received'

    },
    {
      message: 'listen to my song',
      status: 'received'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },],
    date: new Date(),

  },
  {
    img: 'http://localhost:3000/_next/image/?url=%2Fckay.png&w=96&q=75',
    name: ' ckay',
    messages: [{
      message: 'hi!',
      status: 'sent'

    }, {
      message: 'hi',
      status: 'received'

    },
    {
      message: 'hello',
      status: 'received'

    },
    {
      message: 'listen to my song',
      status: 'received'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'ok',
      status: 'sent'

    },
    {
      message: 'enough',
      status: 'received'

    },
    ],
    date: new Date(),

  },
  {
    img: 'https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg',
    name: ' jeff bezos',
    messages: [{
      message: 'hi',
      status: 'sent'

    }, {
      message: ' jujujujujujujujujujujujujujujujujjujujujujujujujujujjujujujujujjuuujujuujjujjuujujujuj',
      status: 'received'

    },
    {
      message: 'hello',
      status: 'received'

    },
    {
      message: 'listen to my song',
      status: 'received'

    },
    {
      message: 'jujujujujujuj',
      status: 'sent'

    },],
    date: new Date('28 december 2022'),

  },
  ]
  const MessagesInView = chats[Number(chatId)]
  return (
     <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title='Chat'
    >
      <div className=' h-[95vh] py-6'>
        <div className={`md:w-2/4  max-h-screen w-full h-full   bg-black  `}>
          <ChatArea img={MessagesInView?.img} name={MessagesInView?.name} date="1/02/23" messages={MessagesInView?.messages} />

          {/* date={MessagesInView?.date?.toDateString()} */}

        </div>
      </div>

    </Main>

  )
}

export default Chat