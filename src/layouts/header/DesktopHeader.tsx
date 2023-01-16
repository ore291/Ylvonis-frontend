import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationDropdown } from "./NotificationDropdown";
import Image from "next/image";
import Link from "next/link";

function DesktopHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const user = {
    profileImg: "",
    name: "ckay ckay",
    posts: "",
    followers: "",
    following: "",
  };

  const isLoggedIn = true;

  const notifications = [
    {
      type: "album",
      img: "/beats.png",
      artist: "ckay",
      title: "yes i need you",
      date: new Date(),
    },
    {
 type: "album",
      img: "/beats.png",
      artist: "ckay",
      title: "yes i need you",
      date: new Date(),
    },
    {
 type: "album",
      img: "/erik.jpg",
      artist: "Ruga",
      title: "NOW",
      date: new Date(),
    },
    {
 type: "song",
      img: "/cool.png",
      artist: "Victony",
      title: "antisocial",
      date: new Date(),
    },
    {
 type: "song",
      img: "/austin.jpg",
      artist: "rare americans",
      title: "run the world",
      date: new Date(),
    },
  ];

  return (
    <nav className="relative md:flex flex-wrap items-center justify-between hidden  rounded">
      <div className="container  mx-auto flex flex-wrap items-center justify-between">
        <div className=" relative border-r border-gray-700 !w-[169px]  h-full !m-0 flex justify-between  p-3  lg:static lg:block lg:justify-start">
          <div className="flex items-start space-x-2 ">
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              className=" rounded-full object-contain"
              alt=""
            />
            <h1 className="gradText font-bold text-xl">Ylvonis</h1>
          </div>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="flex justify-start w-3/4 items-center gap-16">
          <div className=" ">
            <form
              action=""
              className="ml-1 h-8 rounded-2xl border-[0.5px] border-bgGray flex gap-1 items-center "
            >
              <button type="submit">
                <BiSearchAlt size={20} className="ml-1" />
              </button>
              <input
                type="search"
                name=""
                id=""
                autoFocus
                placeholder="Search"
                className="bg-transparent outline-none !ring-0 !ring-none !focus:ring-0 !appearance-none  rounded-2xl w-full pt-4 h-full !text-white focus:border-0 mb-2 border-0  "
              />
            </form>
          </div>
          <div className=" ml-auto pl-60">
            <NotificationDropdown notifications={notifications}/>
          </div>
          <div className="ml-auto ">
            {isLoggedIn ? (
              <ProfileDropdown user={user} />
            ) : (
              <div className="flex gap-3 h-8">
                <button className="gradButton rounded  px-2  block !text-sm  capitalize">
                  <Link href={"/login"}>Login</Link>
                </button>
                <button className="bg-transparent capitalize mr-2 border-purple-600 border-solid border-2 px-1   !text-sm rounded">
                  <Link href={"/register"}>Register</Link>
                </button>
              </div>
            )}
          </div>
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
  );
}

export default DesktopHeader;
