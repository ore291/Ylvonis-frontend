import { useGetPostCommentsQuery } from '@/store/api/comment'
import React from 'react'
import Loading from '../utils/Loading'
import Comment from './Comment'

const Comments = ({ post_id }: { post_id: string }) => {
  const { data, isFetching, isLoading } = useGetPostCommentsQuery(post_id, {
    pollingInterval: 100000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  return (
    <div className="w-full max-h-full overflow-auto scrollbar-hide py-5">
      {isLoading ? (
        <div className="w-full h-[50px] flex-container">
          <Loading w="2" h="2" />
        </div>
      ) : data.comments && data.comments.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-y-1 ">
          {data.comments.map((comment: any, index: number) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
      ) : (
        <span className="text-xsm text-center ">No Comments</span>
      )}
    </div>
  )
}

export default Comments
