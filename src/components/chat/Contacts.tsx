import React from 'react'
import { ChatItem } from 'react-chat-elements'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'

const Contacts = ({
  contacts,
  onChatClick,
}: {
  contacts: any
  onChatClick: any
}) => {
  const router = useRouter()
  return (
    <div className="w-full h-[20rem] overflow-y-auto">
      {contacts.map((contact: any) => (
        <ChatItem
          key={contact._id}
          id={contact._id}
          avatar={contact.otherUser.profile_pic}
          alt={''}
          title={`${contact.otherUser.firstname} ${contact.otherUser.lastname}`}
          subtitle={contact.message.messageText}
          onClick={() => {
            !isMobile
              ? onChatClick(contact)
              : router.replace(`/chat/${contact.chatRoomId}`)
          }}
          date={contact.createdAt}
          unread={1}
        />
      ))}
    </div>
  )
}

export default Contacts
