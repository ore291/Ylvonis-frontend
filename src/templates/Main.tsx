import type { ReactNode } from "react";
import Header from "../layouts/header/Header";
import Footer from "@/layouts/footer";
import Sidebar from "@/layouts/sidebar";
import NowPlaying from "@/layouts/nowPlaying";

//import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  title?: string;
  nested?: boolean;
};

const Main = (props: IMainProps) => (
  <div className="w-full  px-1 text-white antialiased relative">
    {props.meta}
    <Header  title={props.title} nested={props?.nested} />
   
    <div className="mx-auto max-w-screen-l relative  md:grid md:grid-cols-5  w-full">
      <Sidebar />
      <div className="content md:col-span-4 md:pr-20  overflow-scroll  md:h-[90vh]  px-1">
        {props.children}
      </div>
    </div>

    <div className="fixed bottom-0 left-0 w-full">
      <div className=" ">
        <NowPlaying />
      </div>
      <Footer />
    </div>
  </div>
);

export { Main };
