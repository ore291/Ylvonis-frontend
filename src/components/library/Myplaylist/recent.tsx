import {useState} from 'react'
import { BsListUl, BsPlus } from 'react-icons/bs'
import AddNew from './AddNew'
import PlayListCard from './PlayListCard'


export default function RecentPlayLists() {
  const numOfPlaylist = 5
  const playlists = [
    { img: 'Cool.png', name: 'gospel' },
    { img: 'cool.png', name: 'Cool Music' },
    { img: 'beats.png', name: 'Beats' },
    { img: 'praise.png', name: 'Worships' },
    { img: 'worship.png', name: 'Worships' },
  ]
  const [showAddNew, setShowAddNew] = useState(false)
  return (
    <main className='h-[70vh] mb-[5vh] max-w-screen overflow-scroll'>
      <AddNew show={showAddNew} setShow={setShowAddNew} />
      <section>
        <nav className='flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none '>
          <div className='capitalize text-utilGray'>{numOfPlaylist} playlists </div>
          <button> <BsListUl size={30} className='text-utilGray'/>  </button>
        </nav>
        <div className='py-2 flex gap-4 px-4 md:py-4 items-center border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none '>
          <button className='btn btn-block gradButton p-2 text-xl rounded-md' onClick={() => setShowAddNew((prev) => !prev)}>
            <BsPlus size={35} />
          </button>
          <h1>Add new playlist</h1>

        </div>
      </section>
      <section className='grid  cursor-pointer  mb-2 md:mb-0 max-h-[60vh] mt-2 overflow-scroll'>
        <div className='md:grid md:grid-cols-5 gap-2'>
          {playlists.length === 0 ? <header className='text-xl text-center col-span-5 w-full mt-2 text-bold'>No Playlists Found</header> :
            playlists?.map((playlist, index) => (
              <div key={index}>
                <PlayListCard img={playlist?.img} playListName={playlist?.name} />
              </div>

            ))
          }


        </div>
        
      </section>
    </main>
  )
}
