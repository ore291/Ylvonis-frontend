import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { BsChevronLeft } from 'react-icons/bs'
import { FaCog } from 'react-icons/fa'
import { SlBell } from 'react-icons/sl'

function MobileHeader({
  
  title,
  nested,
}: {

  title: any;
  nested?: boolean;
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
 
  return (
    <nav className="relative flex h-[70px] border-b border-chatGray items-center justify-between py-3 md:hidden rounded">
      <div className="container  mx-auto flex flex-wrap items-center justify-between">
        <div className=" relative  flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          {nested ? (
            <div className="flex items-center space-x-2">
              <BsChevronLeft size={28} onClick={() => router.back()} />
              <h1 className="text-white font-bold text-xl">{title}</h1>
            </div>
          ) : (
            <div className="flex items-start space-x-2">
              <Image
                src="/logo.svg"
                width={30}
                height={30}
                className=" rounded-full object-contain"
                alt=""
              />

              <h1 className="gradText font-bold text-xl">{title}</h1>
            </div>
          )}

          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="mr-3">
          <ul className="flex justify-evenly gap-3">
            <li>
              <BiSearchAlt size={"30px"} />
            </li>
            <li className="bg-white  bg-clip-text">
              <Link href={"/notifications"}>
                <SlBell className="text-white" size={"28px"} />
              </Link>
            </li>
            <li>
              <Link href={"/settings"}>
                <FaCog size={"30px"} />
              </Link>
            </li>
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
  )
}

export default MobileHeader