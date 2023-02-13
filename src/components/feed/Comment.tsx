import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { intlFormatDistance } from 'date-fns'
import { BsFillHeartFill, BsHeart, BsThreeDots } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { useLikeCommentMutation } from '@/store/api/comment'
import CommentReplies from './CommentReplies'

const Comment = ({ comment }: { comment: any }) => {
  const [showReply, setShowReply] = useState<boolean>(false)
  const [
    likeComment,
    { isLoading: likingComment, isSuccess: commentLiked },
  ] = useLikeCommentMutation()

  const { data: session } = useSession()
  const [liked, setLiked] = useState(
    comment.likes.includes(session?.user.id.toString()),
  )

  const toggleLike = () => {
    likeComment(comment.id)
    setLiked(!liked)
  }

  useEffect(() => {
    setLiked(comment.likes.includes(session?.user.id.toString()))
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
              src={comment.user.profile_pic}
              alt={comment.user.firstname}
            />
            <span className="text-brand">{comment.user.username}</span>
          </p>
          <p className="text-xsm text-gray-600 dark:text-gray-400">
            {intlFormatDistance(new Date(comment.createdAt), new Date())}
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
            {comment.likes.length}{' '}
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
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {comment.comment}
        </p>
        <div className="flex items-center mt-1 space-x-4">
          {comment.replies.length > 0 ? (
            <button
              onClick={() => setShowReply(!showReply)}
              type="button"
              className="flex items-center text-xsm text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              View replies ({comment.replies.length})
            </button>
          ) : (
            <button
              onClick={() => setShowReply(!showReply)}
              type="button"
              className="flex items-center text-xsm text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Reply
            </button>
          )}
        </div>
        {showReply ? <CommentReplies comment_id={comment.id} /> : null}
      </div>
    </article>
  )
}

export default Comment
