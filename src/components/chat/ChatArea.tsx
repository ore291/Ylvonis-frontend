//@ts-nocheck (prevents typescript checking) please dont remove
import React from 'react'
import { MessageBox } from "react-chat-elements";

// chat area componenet
//didn't define type cause it was throwing typescript error cause i don't know how to use it well
function ChatArea(props) {

  return (
      <div className="flex  flex-col md:block ">
        {/* Header */}
        <div className=" px-3  flex flex-row justify-between items-center">
          <div className="flex items-center">
            <div>
              {/* didnt use next-image cause it wasnt working with external images ,but i guess you can change it */}
              <img
                className="w-10 h-10 rounded-full"
                src={props.img}
              />
            </div>
            <div className="ml-4">
              <p className="text-grey-darkes text-white">
               {props.name}
            </p>
            {/* used for the online/offline status */}
              <p className="text-grey-darker text-xs mt-1">
               
              </p>
            </div>
        </div>
        {/* ignore this for now ,they are for icons  */}
          <div className="flex">
            <div>

            </div>
            <div className="ml-6">

            </div>
            <div className="ml-6">

            </div>
          </div>
        </div>
        {/* Messages */}
      <div className="flex-1 items-end  bg-chatGray overflow-scroll h-screen md:!min-h-[360px] md:max-h-[360px] mb-2">
        <div className="py-2 px-3 ">
            <div className="flex justify-center mb-2">
              <div className="rounded py-2 px-4">
              {/* <p className="text-sm text-white uppercase">{props.date.toDateString()}</p> */}
              </div>
            </div>
          <div className="flex justify-center items-end mb-4"></div>
            {props.messages?.map((message:{message:string,status:string}, index:number) => (
              <div key={index}>
                {/* im forcing controll of the css for this  component in global.css   */}
                <MessageBox
                  type="text"
                  title={ ''}
                  position={message.status === 'sent' ?  'right':'left'}
                  text={message.message}
                  className={message.status === 'sent' ? 'rce-mbox-received' : ''}
                />
              </div>
             
            )                    
            )}
          </div>
        </div>
        {/* Input */}
        <div className="bg-grey-lighter px-4 py-4 flex items-center">
          <div>
           
          </div>
          <div className="flex-1 mx-4">
            <input
              className="w-full border rounded px-2 py-2"
              type="text"
            />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                fill="#263238"
                fillOpacity=".45"
                d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
              />
            </svg>
          </div>
        </div>
      </div>


    
  )
}

export default ChatArea