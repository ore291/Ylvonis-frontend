import {useState} from 'react'
import { BsListUl, BsPlus } from 'react-icons/bs'
import AddNew from './AddNew'
import PlayListCard from './PlayListCard'

function SubscribedPlaylists() {
  const numOfPlaylist = 5
  const playlists:{img:string,name:string}[] = [
    // { img: 'Cool.png', name: 'gospel' },
    // { img: 'cool.png', name: 'Cool Music' },
    // { img: 'beats.png', name: 'Beats' },
    // { img: 'praise.png', name: 'Worships' },
    // { img: 'worship.png', name: 'Worships' },
  ]
  const [showAddNew, setShowAddNew] = useState(false)
  return (
    <main className='h-[70vh] mb-[5vh] max-w-screen overflow-scroll'>
      <AddNew show={showAddNew} setShow={setShowAddNew} />
      <section>
        <nav className='flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none '>
          <div className='capitalize text-utilGray'>{numOfPlaylist} playlists </div>
          <button> <BsListUl size={30} className='text-utilGray' />  </button>
        </nav>
        <div className='py-2 flex gap-4 px-4 md:py-4 items-center border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none '>
          <button className='btn btn-block gradButton p-2 text-xl rounded-md' onClick={() => setShowAddNew((prev) => !prev)}>
            <BsPlus size={35} />
          </button>
          <h1>Add new playlist</h1>

        </div>
      </section>
      <section className="">
        {playlists.length === 0 ? (
          <header className="text-xl text-center  w-full mt-2 text-bold">
            No Playlists Found
          </header>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-2">
            {playlists?.map((playlist, index) => (
              <div key={index}>
                <PlayListCard
                  img={playlist?.img}
                  playListName={playlist?.name}
                />
              </div>
            ))}{' '}
          </div>
        )}
      </section>
    </main>
  )
}


export default SubscribedPlaylists