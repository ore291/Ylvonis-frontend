import { useRouter } from "next/router";
import React, { ReactNode ,useEffect} from "react";
//import { AiOutlineHome } from "react-icons/ai";
import { TiHome } from "react-icons/ti";
import { BsNewspaper, BsChat } from "react-icons/bs";
import { TbPlaylist } from "react-icons/tb";
import { MdOutlineLibraryMusic, MdOutlinePlaylistPlay } from "react-icons/md";
import Link from "next/link";
import { RoutesType } from "@/components/library/mainpage";
import Settings from '../pages/settings/index';
import { FaUserCheck } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";

export const ActiveLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const router = useRouter();

  

  const className = router.asPath.includes(`${href}/`)  || router.asPath === href
    ? "gradLink md:flex  "
    : "text-gray-500 md:flex ";



  return (
    
      <Link href={href}  className={className}>
        {children}
      </Link>
   
  );
};

const routes: RoutesType[] = [

  {
    title: 'Home',
    icon: <TiHome size={30} className="mx-auto" />,
    link: '/'
  },
  {
    title: 'feed',
    icon: <BsNewspaper size={30} className="mx-auto" />,
    link: '/feed'
  },
  {
    title: 'chat',
    icon: <BsChat size={30} className="mx-auto" />,
    link: '/chat'
  },
  {
    title: 'listen',
    icon: <TbPlaylist size={30} className='mx-auto' />,
    link: '/listen'
  },
  {
    title: 'library',
    icon: <MdOutlineLibraryMusic size={30} className="mx-auto" />,
    link: '/library'
  },

  



]

export const Sidebar = () => {
  return (
    <aside className="w-full ">
      <div className="flex flex-col  h-full  relative    h-full justify-between ">
        {routes.map((route: RoutesType, index: number) => (
          <div
            key={index}
          >
            {route.title === 'chat' ? (<span
              className={` absolute text-xsm text-white right-0 bg-red-500 rounded-full top-0  px-1 z-40 hover:scale-105 cursor-pointer `}
            >
              13
            </span>) : ''}
            <ActiveLink href={route.link} >
              {route.icon}
              <span className="   capitalize">{route.title}</span>
            </ActiveLink>
          </div>
        ))}

      </div>
    </aside>
  )
}



function Footer() {
  const router = useRouter()
  useEffect(() => {
   
    // Prefetch the dashboard page
    router.prefetch('/chat')
    router.prefetch('/feed')
    router.prefetch('/listen')
  }, [])

 
  return (
    <div className="flex justify-center">
      {" "}
      <nav
        className="w-full md:hidden justify-evenly gap-3  bg-bgGray flex border-t border-solid border-slate-700 py-2 px-
		"
      >
        {/* Bottom Icon Navigation Menu */}
        {routes.map((route:RoutesType,index:number) => (
          <div
            key={index}
            className="flex flex-col relative  justify-between text-xsm "
          >
            {route.title === 'chat' ? (<span
              className={` absolute text-xsm  text-white right-0 bg-red-500 rounded-full top-0  px-1 z-40 hover:scale-105 cursor-pointer `}
            >
              13
            </span>):''}
            <ActiveLink href={route.link}>
             {route.icon}
              <span className=" text-xsm   capitalize">{route.title}</span>
            </ActiveLink>
          </div>
          
        ))}

      
      </nav>
    </div>
  );
}

export default Footer;
