import {
  useAddCommentReplyMutation,
  useGetCommentRepliesQuery,
  useGetPostCommentsQuery,
} from '@/store/api/comment'
import React, { FormEvent, useEffect, useState } from 'react'
import Loading from '../utils/Loading'
import Comment from './Comment'
import CommentReply from './CommentReply'

const CommentReplies = ({ comment_id }: { comment_id: string }) => {
  const { data, isFetching, isLoading } = useGetCommentRepliesQuery(
    comment_id,
    {
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  )

  const [comment, setComment] = useState('')

  const [
    addComment, // This is the mutation trigger
    { isLoading: isCommenting }, // This is the destructured mutation result
  ] = useAddCommentReplyMutation()

  const handleComment = (e: FormEvent) => {
    e.preventDefault()
    if (comment == '') {
      return
    } else {
      addComment({ comment_id: comment_id, body: comment })
      setComment('')
    }
  }

  return (
    <div className="w-full max-h-[300px] overflow-auto scrollbar-hide py-5">
      {isLoading ? (
        <div className="w-full h-[50px] flex-container">
          <Loading w="2" h="2" />
        </div>
      ) : data.replies && data.replies.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-y-1 ">
          {data.replies.map((reply: any, index: number) => (
            <CommentReply reply={reply} key={index} />
          ))}
        </div>
      ) : (
        <span className="text-xsm text-center ">No Replies</span>
      )}
      <div className="my-1 w-full h-16">
        <form
          onSubmit={(e) => handleComment(e)}
          className="flex border rounded border-brand w-full bg-bgGray   items-center px-1 "
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            type="text"
            id="comment"
            className="flex-1 border-0 rounded   bg-transparent   text-sm  focus:ring-0 focus:0 block w-full h-[40px] text-gray-200 "
            placeholder="Reply..."
          />
          <button
            className="gradButton rounded !text-xs flex-container  p-2 block   capitalize"
            type="submit"
            disabled={isCommenting}
          >
            {isCommenting ? <Loading w="2" h="2" /> : 'Reply'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentReplies
