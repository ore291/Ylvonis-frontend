import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { intlFormatDistance } from 'date-fns'
import { BsFillHeartFill, BsHeart, BsThreeDots } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { useLikeCommentReplyMutation } from '@/store/api/comment'


const CommentReply = ({ reply }: { reply: any }) => {
  const [
    likeComment,
    { isLoading: likingComment, isSuccess: commentLiked },
  ] = useLikeCommentReplyMutation()

  const { data: session } = useSession()
  const [liked, setLiked] = useState(
    reply.likes.includes(session?.user.id.toString()),
  )

  const toggleLike = () => {
    likeComment(reply.id)
    setLiked(!liked)
  }

  useEffect(() => {
    setLiked(reply.likes.includes(session?.user.id.toString()))
  }, [])

  return (
    <article className="w-full py-2 !px-4 text-base rounded-lg bg-gray-900">
      <footer className="flex justify-between items-center ">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-white">
            <Image
              width={24}
              height={24}
              className="mr-2 w-6 h-6 rounded-full"
              src={reply.user.profile_pic}
              alt={reply.user.firstname}
            />
            <span className="text-brand">{reply.user.username}</span>
          </p>
          <p className="text-xsm text-gray-600 dark:text-gray-400">
            {intlFormatDistance(new Date(reply.createdAt), new Date())}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          <button
            disabled={likingComment}
            className="flex text-sm items-center gap-1 cursor-pointer"
            onClick={() => toggleLike()}
          >
            {liked ? (
              <BsFillHeartFill size={12} className="text-brand  " />
            ) : (
              <BsHeart size={12} />
            )}
            {reply.likes.length}{' '}
          </button>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400  rounded-lg  focus:ring-0 focus:outline-none"
            type="button"
          >
            <BsThreeDots />
            <span className="sr-only">Comment settings</span>
          </button>
        </div>

        {/* Dropdown menu */}
        <div
          id="dropdownComment1"
          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="ml-7">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{reply.body}</p>
      </div>
    </article>
  )
}

export default CommentReply
