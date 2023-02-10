import React from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import Image from 'next/image'
import Link from 'next/link'

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import SuggestedPeopleCard from '@/components/utils/SuggestedPeopleCard'
import useAuth from '@/hooks/useAuth'
import { useSession } from 'next-auth/react'
import { useGetDiscoveredUserQuery, useGetUserQuery } from '@/store/api/user'
import Loading from '@/components/utils/Loading'
import RecentSongs from '@/components/library/SongLibrary/recent'
import RecentPlayLists from '@/components/library/Myplaylist/recent'

const user = {
  profileImg: '/ckay1.png',
  name: 'ckay ckay',
  posts: '10',
  followers: '350',
  following: '60',
  biography:
    'Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.',
}

const suggestedUsers = [
  {
    name: 'fave',
    followers: '320',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'id',
    followers: '459',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'mercy chinwe',
    followers: '909',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'victony',
    followers: '1',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'davido',
    followers: '100',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'zadok',
    followers: '40',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'sasaki',
    followers: '80',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'aurora',
    followers: '90',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'yui',
    followers: '678',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'kori',
    followers: '78',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'kori',
    followers: '78',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
  {
    name: 'kori',
    followers: '78',
    following: 1,
    img: 'ckay1.png',
    nation: 'nigeria',
  },
]

function Profile() {
  const authenticated = useAuth(true)

  const { data: session, status } = useSession()

  const { data, isFetching, isLoading, isError, isSuccess } = useGetUserQuery(
    null,{
      refetchOnMountOrArgChange : true
    }
  )

  const {
    data: discovered,
    isLoading: isDiscovering,
    isSuccess: isDiscovered,
  } = useGetDiscoveredUserQuery(null)

  if (status == 'authenticated') {
    return (
      <Main
        meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
        title="Profile"
        nested={true}
      >
        {isLoading ? (
          <div className="w-full flex-container h-[60vh]">
            <Loading w="10" h="10" />
          </div>
        ) : (
          data.user && (
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
                  <div className="flex gap-6 md:gap-10  ">
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
                  </div>
                </div>
                {/* user  name and description */}
                <div>
                  <div className="p-4 flex flex-col justify-start gap-1">
                    <h1 className="capitalize font-bold text-lg !m-0">
                      {data.user.firstname} {data.user.lastname}
                    </h1>
                    <p className="!m-0 !p-0 text-sm text-utilGray text-e">
                      {data.user.bio}
                    </p>
                  </div>
                </div>
              </section>
              <section className="px-1 md:px-2">
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
              </section>

              {/* section for whats at the buttom of the profile page ,the design didnt have a very clear design so i didnt do any thing  */}
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
                    <Tab>Posts/comments</Tab>
                  </TabList>
                  <TabPanel><RecentSongs /></TabPanel>
                  <TabPanel> <RecentPlayLists /></TabPanel>
                  <TabPanel></TabPanel>
                </Tabs>
              </section>
            </main>
          )
        )}
      </Main>
    )
  } else {
    return null
  }
}

export default Profile
