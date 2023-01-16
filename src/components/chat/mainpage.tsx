
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChatItems from './ChatItem';
import ChatArea from './ChatArea';
import { useState } from "react";


// don't know how the data is coming but i defined types for it,which may end up not being used
export type ChatTypes= {
  id?: number
  img: string
  name?: string
  messages: {message:string,status:string}[]
  date?: Date
  onClick?: () => void
}
function MainPage() {
  const chats:ChatTypes[] = [{
    img: 'http://localhost:3000/_next/image/?url=%2Fckay.png&w=96&q=75',
  name:' ckay',
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
        status:'sent'
        
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

// 
 
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  
  const MessagesInView = chats[currentMessageIndex]
  

  const onChatClick = (index:number) => {
    setCurrentMessageIndex(index)
  }

  return (
    
    <main className='flex  mx-auto w-full gap-1 '>
      <div className='md:w-2/4 w-full max-h-[68vh] '>
        <Tabs defaultFocus={true} selectedTabClassName={'bg-transparent focused-tab !relative'}>
          <TabList className={'bg-bgGray flex items-center justify-between text-utilGray  py-1 md:py-3 md:items-start md:justify-start'}>
            <Tab>Chat </Tab>
            <Tab>Message Requests</Tab>
            <Tab>Calls</Tab>
          </TabList>
          <TabPanel>
            <div>
              {chats?.map((chat, index) => (
                <div key={index}>
                  <ChatItems id={index} img={chat.img} name={chat.name} message={chats[index]?.messages?.slice(-1)[0]?.message} onChatClick={onChatClick} />
                </div>

              ))}
            </div>

          </TabPanel>
          <TabPanel>

          </TabPanel>
          <TabPanel>

          </TabPanel>
        </Tabs>
      </div>
     

     {/*  */}
      <div className={`md:w-2/4 hidden md:block max-h-[68vh]`}>
        <ChatArea img={MessagesInView?.img} name={MessagesInView?.name} date={MessagesInView?.date} messages={MessagesInView?.messages} />
      
      </div>


     
    
    </main>
  )
}

export default MainPage