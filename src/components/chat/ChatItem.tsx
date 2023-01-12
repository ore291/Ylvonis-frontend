'use client'


import { ChatItem } from "react-chat-elements";

import { useRouter } from 'next/router';
import { useState } from "react";


// chat-item props types,change when you get the chat data
interface ChatPropTypes{
  id:number
  img:string
  name?: string
  message?: string
  date?:Date
  onChatClick?: any
}



function ChatItems(props: ChatPropTypes) {

  const router = useRouter()
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth :'680'
 

  const useDeviceSize = () => {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

   
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
   

    return{width,height}
  }
  
 

  return (
    <main>
      <section>
        <div className="">
          {/* react chat-item component 
            google the documentation it's very useful
          
          */}
          <ChatItem
            id={props.id}
            avatar={
              props.img
            }
            alt={""}
            title={props.name}
            subtitle={props.message}
            onClick={() => { windowWidth > 680 ?  props.onChatClick(props.id) : router.push(`/chat/${props.id}`)}}
            date={props.date}
            unread={2}
            statusColor={
              "green"
            }
          />
        </div>

      </section>
    </main>
  )
}

export default ChatItems