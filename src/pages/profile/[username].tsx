import React, { useEffect, useState } from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import Image from 'next/image'
import Link from 'next/link'

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import SuggestedPeopleCard from '@/components/utils/SuggestedPeopleCard'
import {
  useFollowUserMutation,
  useGetDiscoveredUserQuery,
  useGetUserByUsernameQuery,
  useUnFollowUserMutation,
} from '@/store/api/user'
import Loading from '@/components/utils/Loading'
import RecentSongs from '@/components/library/SongLibrary/recent'
import RecentPlayLists from '@/components/library/Myplaylist/recent'
import { useRouter } from 'next/router'
import OtherUserSongs from '@/components/profile/OtherSongs'
import { useSession } from 'next-auth/react'
import OtherPlaylists from '@/components/profile/OtherPlaylists'
import { BsChatLeftDots } from 'react-icons/bs'
import { useInitiateChatMutation } from '@/store/api/chat'
import { isMobile } from 'react-device-detect'

function Username() {
  const router = useRouter()

  const { status, data: session } = useSession()

  const [username, setUsername] = useState(null)

  const [
    chat, // This is the mutation trigger
    { isLoading: isChatting, isSuccess: chatted, data: result }, // This is the destructured mutation result
  ] = useInitiateChatMutation()

  useEffect(() => {
    if (!chatted) return

    if (isMobile) {
      router.push(`/chat/${result.chatRoom.chatRoomId}`)
    } else {
      router.push('/chat')
    }
  }, [chatted])

  useEffect(() => {
    if (!router.isReady) return
    router?.query && setUsername(router?.query?.username)
  }, [router.isReady])

  useEffect(() => {
    if (status == 'authenticated' && session?.user?.username == username) {
      router.push('/profile')
    }
  }, [username])

  const {
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserByUsernameQuery(username, {
    refetchOnMountOrArgChange: true,
    skip: !username,
  })

  const [following, setFollowing] = useState(false)

  useEffect(() => {
    if (!isSuccess) return
    setFollowing(
      status == 'authenticated' &&
        data.user.followers.hasOwnProperty(session?.user.id.toString()),
    )
  }, [status, isSuccess])

  const [
    followUser,
    { isLoading: followingUser, isSuccess: followed },
  ] = useFollowUserMutation()

  const [
    unFollowUser,
    { isLoading: unFollowingUser, isSuccess: unfollowed },
  ] = useUnFollowUserMutation()

  useEffect(() => {
    if (!followed) return
    setFollowing(true)
  }, [followed])

  useEffect(() => {
    if (!unfollowed) return
    setFollowing(false)
  }, [unfollowed])

  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Username"
      nested={true}
    >
      {isLoading ? (
        <div className="w-full flex-container h-[60vh]">
          <Loading w="10" h="10" />
        </div>
      ) : (
        data?.user && (
          <main className="max-h-full overflow-scroll mb-10">
            <section>
              <div className="flex items-center justify-between md:justify-start md:space-x-10 p-2  my-3">
                <div className=" relative h-24 w-24 bg-white rounded-full">
                  <Image
                    src={data.user.profile_pic}
                    alt=""
                    sizes=""
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="rounded-full "
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5  gap-6 md:gap-10  ">
                  <div className="flex flex-col justify-start items-center gap-1 ">
                    <h1 className="font-bold text-white text-lg md:text-2xl">
                      {data.posts.length}
                    </h1>
                    <span className="text-sm text-utilGray ">Posts</span>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <h1 className="font-bold text-white text-lg md:text-2xl ">
                      {Object.keys(data.user.followers).length}
                    </h1>
                    <span className="text-sm text-utilGray ">Followers</span>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <h1 className="font-bold text-white text-lg md:text-2xl">
                      {Object.keys(data.user.following).length}
                    </h1>
                    <span className="text-sm text-utilGray ">Following</span>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <h1 className="font-bold text-white text-lg md:text-2xl">
                      {data.songs.length}
                    </h1>
                    <span className="text-sm text-utilGray ">Songs</span>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <h1 className="font-bold text-white text-lg md:text-2xl">
                      {data.playlists.length}
                    </h1>
                    <span className="text-sm text-utilGray ">Playlists</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-4 flex flex-col justify-start gap-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="capitalize font-bold text-lg md:text-3xl !m-0">
                      {data.user.firstname} {data.user.lastname}
                    </h1>
                    {status == 'authenticated' ? (
                      <>
                        {following ? (
                          <button
                            className="gradButton rounded-md !text-sm min-w-[80px] h-8 px-2 py-1 block   capitalize"
                            type="button"
                            onClick={() => unFollowUser(data.user.id)}
                            disabled={unFollowingUser}
                          >
                            {unFollowingUser ? (
                              <Loading w="3" h="3" />
                            ) : (
                              'followed'
                            )}
                          </button>
                        ) : (
                          <button
                            className="gradButton rounded-md !text-sm min-w-[80px] h-8  px-2 py-1 block   capitalize"
                            type="button"
                            onClick={() => followUser(data.user.id)}
                            disabled={followingUser}
                          >
                            {followingUser ? (
                              <Loading w="3" h="3" />
                            ) : (
                              'follow +'
                            )}
                          </button>
                        )}
                        <div
                          onClick={() => chat(data.user.id)}
                          className="px-2 min-w-16 h-8 cursor-pointer flex-container bg-brand rounded-md space-x-2"
                        >
                          {isChatting ? (
                            <Loading w="3" h="3" />
                          ) : (
                            <>
                              {' '}
                              <span className="text-xs">Message</span>
                              <BsChatLeftDots className="w-4 h-4" />
                            </>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>

                  <p className="!m-0 !p-0 text-sm text-utilGray text-e">
                    {data.user.bio}
                  </p>
                </div>
              </div>
            </section>
            {/* <section className="px-1 md:px-2">
                <div className="row-container my-2">
                  <h1 className="font-semibold text-lg p-2">Discover People</h1>
                  <Link href={'/feed'}>
                    <span className="justify-end gradText underline  ">
                      see more
                    </span>
                  </Link>
                </div>
                {isDiscovering ? (
                  <div className="w-full h-14 flex-container">
                    <Loading w="3" h="3" />
                  </div>
                ) : discovered && discovered.length > 0 ? (
                  <div className="mb-4 flex max-w-[100vw] justify-start mx-2 md:max-h-fit items-center gap-4 overflow-scroll scroll-m-0 md:grid md:mx-0 md:grid-cols-5">
                    {discovered &&
                      discovered.map((user: any) => (
                        <SuggestedPeopleCard key={user.id} user={user} />
                      ))}
                  </div>
                ) : (
                  <div className="flex-container w-full my-10">
                    <h2 className="text-center text-xl font-semibold">
                      No Users Found
                    </h2>
                  </div>
                )}
              </section> */}

            <section>
              <Tabs
                defaultFocus={true}
                selectedTabClassName={'bg-transparent focused-tab !relative'}
              >
                <TabList
                  className={
                    'bg-bgGray flex items-center justify-between text-utilGray  whitespace-nowrap py-1 md:py-3 md:items-start md:justify-start'
                  }
                >
                  <Tab>Song Library</Tab>
                  <Tab>Playlists</Tab>
                  {/* <Tab>Posts/comments</Tab> */}
                </TabList>
                <TabPanel>
                  <OtherUserSongs songs={data.songs} />
                </TabPanel>
                <TabPanel>
                  <OtherPlaylists playlists={data.playlists} />
                </TabPanel>
                {/* <TabPanel></TabPanel> */}
              </Tabs>
            </section>
          </main>
        )
      )}
    </Main>
  )
}

export default Username
