import Image from 'next/image'
import React from 'react'
import { FaGlobe, FaCog } from "react-icons/fa"
import { BiSearchAlt } from 'react-icons/bi'
import { SlBell } from 'react-icons/sl'

export default function Menu({ fixed, title }: { fixed: boolean, title: any }) {
  {
    const [menuOpen, setMenuOpen] = React.useState(false)
    return (
      <>
        <div className="flex flex-wrap py-2 border-b border-solid border-slate-700">
          <div className="w-full ">
            <nav className="relative flex flex-wrap items-center justify-between py-3  rounded">
              <div className="container  mx-auto flex flex-wrap items-center justify-between">
                <div className=" relative  flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                  {/* <a
                    className="text-sm font-bold leading-relaxed inline-block  py-2 whitespace-nowrap uppercase text-white"
                    href="#pablo"
                  >
                    pink Starter Menu
                  </a> */}
               
                  <div className="flex items-start space-x-2">
                    <Image src="/logo.svg" width={30} height={30} className=' rounded-full object-contain' alt='' />
                    <h1 className='gradText font-bold text-xl'>{title}</h1>
                  </div>

                  <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
                <div className='mr-3'>
                  <ul className='flex justify-evenly gap-3'>
                    <li><BiSearchAlt size={'30px'} /></li>
                    <li className='bg-white  bg-clip-text'><SlBell className='text-whit' size={'28px'} /></li>
                    <li><FaCog size={'30px'}/></li>
                  </ul>
                </div>
                {/* <div
                  className={
                    'lg:flex flex-grow items-center' +
                    (menuOpen ? ' flex' : ' hidden')
                  }
                  id="example-navbar-info"
                >
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href="#pablo"
                      >
                        <FaGlobe className="fas fa-globe text-lg leading-lg text-white opacity-75" />
                      </a>
                    </li>
                    <li><BiSearchAlt /></li>
                    <li></li>

                  </ul>
                </div> */}
              </div>
            </nav>
          </div>
        </div>
      </>
    )
  }
}
