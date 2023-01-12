
import type { ReactNode } from 'react';
import Header from "../layouts/Header"
import Footer from '@/layouts/footer';
import NowPlaying from '@/layouts/nowPlaying';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  title?: string
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-white antialiased">
    {props.meta}
    <Header fixed={true} title={props.title} />

    <div className="mx-auto max-w-screen-md">


      <div className="content  px-">{props.children}</div>


    </div>
   
    <div className='fixed bottom-0 left-0 w-full'>
      <div className=' '> <NowPlaying /></div>
     
      <Footer />
    </div>
  </div>
);

export { Main };
