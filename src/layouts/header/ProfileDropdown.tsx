import { RoutesType } from "@/components/library/mainpage";
import Link from "next/link";
import React from "react";
import { BsFillQuestionCircleFill, BsPower, BsChevronDown } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import Image from "next/image";

export const ProfileDropdown = ({user}:{user:{profileImg?:string,name:string}}) => {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  

  

  const routes: RoutesType[] = [

    {
      title: 'Profile',
      icon: <RxAvatar size={23} className="gradSVG" />,
      link: '/settings/profile'
    },
    {
      title: 'help',
      icon: <BsFillQuestionCircleFill size={23} className="gradSVG" />,
      link: '/help'
    },
    {
      title: 'switch account',
      icon: <TbUsers size={23} className="gradSVG" />,
      link: '/login'
    },
    {
      title: 'settings',
      icon: <FaCog size={23} className='gradSVG' />,
      link: '/settings'
    },
    {
      title: 'log out',
      icon: <BsPower size={23} className="gradSVG" />,
      link: '/login'
    },





  ]

  return (
    <div className="relative">
      <button
        id="dropdownAvatarNameButton"
        className="flex items-center text-sm font-medium  rounded-full border-white border-2 h-8 capitalize  md:mr-0 text-white"
        onClick={() => setDropDownOpen((prev) => !prev)}
      >

        {user.profileImg ? (
          <div className="w-6 h-6 mr-2 ml-2 relative rounded-full text-white bg-gray-700">
            {" "}
            <Image
              src={user?.profileImg}
              alt=""
              className="rounded-full"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : (
          <RxAvatar className="w-6 h-6 mr-2 ml-1 rounded-full text-white bg-gray-700" />
        )}

        {user.name}
        <BsChevronDown className="w-4 h-4 mx-1.5" />
      </button>

      {/* dropdown menu */}
      <div
        id="dropdownAvatarName"
        className={`z-10 ${dropDownOpen ? "absolute" : "hidden"
          } bg-bgGray text-white top-9 divide-y left-[-15px] rounded shadow w-44 `}
      >

        <ul
          className="py-2 px-2 text-sm "
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          {routes.map((route, index) => (

            <li key={index}>
              <Link href={route.link}>
                <div className="flex text-base justify-start items-center capitalize py-1 gap-2 ">
                  {route.icon}
                  <span className="text-white">{route.title}</span>

                </div>

              </Link>
            </li>
          ))}

        </ul>

      </div>
    </div>
  );
};