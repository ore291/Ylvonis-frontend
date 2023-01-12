import React from "react";
import { BsListUl } from "react-icons/bs";
import SongCard from "./SongCard";

function RecentSongs() {
  const numOfSongs = 50;
  const songs = [
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
    { img: "Cool.png", name: "gospel", artists: "ruga" },
  ];
  return (
    <main>
      <section>
        <nav className="flex w-full justify-between px-4  py-2 border-solid border-utilGray  md:mx-0 border-b-[0.5px] md:border-none ">
          <div className="capitalize text-utilGray">{numOfSongs} songs </div>
          <button>
            {" "}
            <BsListUl size={30} className="text-utilGray" />{" "}
          </button>
        </nav>
      </section>
      <section className="max-h-[60vh] mt-2 overflow-scroll">
        <div className="md:grid md:grid-cols-5 gap-2">
          {songs.length === 0 ? (
            <header className="text-xl text-center col-span-5 w-full mt-2 text-bold">
              No Songs Found
            </header>
          ) : (
            songs?.map((song, index) => (
              <div key={index}>
                <SongCard
                  img={song?.img}
                  songName={song?.name}
                  artist={song.artists}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default RecentSongs;
