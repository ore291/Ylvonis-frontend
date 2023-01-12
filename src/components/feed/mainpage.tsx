import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlinePicture } from 'react-icons/ai'
import PostCard from "./PostCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ArtististsListItem from '../ArtististsListItem';


function MainPage() {

  const artists = [
    { name: 'fave', followers: '320', following: 1 ,img:'ckay2.png'},
    { name: 'id', followers: '459', following: 1 ,img:'ckay2.png'},
    { name: 'mercy chinwe', followers: '909', following: 1 ,img:'ckay2.png'},
    { name: 'victony', followers: '1', following: 1 ,img:'ckay2.png'},
    { name: 'davido', followers: '100', following: 1 ,img:'ckay2.png'},
    { name: 'zadok', followers: '40', following: 1 ,img:'ckay2.png'},
    { name: 'sasaki', followers: '80', following: 1 ,img:'ckay2.png'},
    { name: 'aurora', followers: '90', following: 1 ,img:'ckay2.png'},
    { name: 'yui', followers: '678', following: 1 ,img:'ckay2.png'},
    { name: 'kori', followers: '78', following: 1 ,img:'ckay2.png'},]
  const users = [
       { name: 'fave', followers: '320', following: 1, img: 'ckay2.png' },
    { name: 'id', followers: '459', following: 1, img: 'cool.png' },
    { name: 'mercy', followers: '909', following: 1, img: 'trumphet.png' },
    { name: 'victor anthony', followers: '1', following: 1, img: 'mercy.png' },
    { name: 'david', followers: '100', following: 1, img: 'gylain.jpg' },
    { name: 'jide', followers: '40', following: 1, img: 'beats.png' },
    { name: 'kunle alake', followers: '80', following: 1, img: 'ckay2.png' },
    { name: 'cyrill', followers: '90', following: 1, img: 'ckay2.png' },
    { name: 'pator', followers: '678', following: 1, img: 'ckay2.png' },
    { name: 'mudill', followers: '78', following: 1, img: 'ckay2.png' },
    ]

  return (
    <main className="flex gap-1 ">
      <section className="md:w-8/12 md:max-h-[70vh] my-6 w-full md:block">

        <div className="col-container ">
          <div className="relative w-full    p- ">
            <div className="absolute text-utilGray inset-y-0 left-0 flex items-center pl-2 pr-2 pointer-events-none">
              <BiEdit size={30} />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-bgGray border-0 capitalize   text-sm rounded-t-md focus:ring-bgGray focus:border-bgGray block w-full pl-10 p-2.5   text-utilGray "
              placeholder="create post"

            />
          </div>

          <div className="w-full bg-bgGray p-3 rounded-b-md flex justify-around items-center   ">
            <div className="text-utilGray flex text-base items-center gap-3 capitalize font-semibold">
              <AiOutlinePicture size={15} />
              picture

            </div>
            <div className="text-utilGray flex text-base items-center gap-3 capitalize font-semibold">
              <AiOutlinePicture size={15} />
              video

            </div>
            <div className="text-utilGray flex text-base items-center gap-3 capitalize font-semibold">
              <AiOutlinePicture size={15} />
              music

            </div>
            
          </div>

        </div>


          

          <div className="mt-4">
            <PostCard profileImg="/ckay2.png" name="ckay" following={1} time={new Date().getTime()} description='music for the soul guy lets  go' image="/gylain.jpg"/>

          </div>
          
       
      </section>

      {/* suggested artists/users */}
      <section className="w-4/12 hidden md:block">
        <Tabs defaultFocus={true} selectedTabClassName={'bg-transparent focused-tab !relative'}>
          <TabList className={'bg-bgGray flex items-center justify-between text-utilGray whitespace-nowrap py-1 md:py-3 md:items-start md:justify-start'}>
            <Tab>Suggested Artists </Tab>
            <Tab>Suggested Users</Tab>
           
          </TabList>
          <TabPanel>
            {artists.map((artist, index) => (
              <div key={index}>
                <ArtististsListItem name={artist.name} followers={artist.followers} following={artist.following} img={artist.img} />
              </div>
              
            ))}
           


          </TabPanel>
          <TabPanel>
            {users.map((user, index) => (
              <div key={index}>
                <ArtististsListItem name={user.name} followers={user.followers} following={user.following} img={user.img} />
              </div>

            ))}
          </TabPanel>
         
        </Tabs>


      </section>
    </main>
  );
}

export default MainPage;
