import Link from 'next/link';
import type { ReactNode } from 'react';
import Header from "../layouts/Header"

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-white antialiased">
    {props.meta}
    <Header fixed={true}/>

    <div className="mx-auto max-w-screen-md">
      

      <div className="content py-5 px-4">{props.children}</div>

      
    </div>
  </div>
);

export { Main };
