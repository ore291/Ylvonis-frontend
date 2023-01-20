import type { ReactNode } from 'react'
import Header from '../layouts/header/Header'
import Footer from '@/layouts/footer'
import Sidebar from '@/layouts/sidebar'
import NowPlaying from '@/layouts/nowPlaying'
import Player from '@/components/Player'
import dynamic from 'next/dynamic'

const AudioSetup = dynamic(() => import('@/components/Audio'), { ssr: false })

//import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode
  children: ReactNode
  title?: string
  nested?: boolean
}

const Main = (props: IMainProps) => (
  <div className="w-full  px-1 text-white antialiased relative">
    {props.meta}
    <Header title={props.title} nested={props?.nested} />

    <div className="  relative  md:grid md:grid-cols-12  w-full gap-0">
      <Sidebar />
      <div className="md:p-2 md:col-span-10   overflow-scroll    px-1 pb-[150px]">
      {/* md:h-[90vh] */}
        {props.children}
      </div>
    </div>
   
    
  </div>
)

export { Main }
