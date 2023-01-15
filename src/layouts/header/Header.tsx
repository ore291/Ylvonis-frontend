import React from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";


export default function Menu({
  fixed,
  title,
  nested,
}: {
  fixed: boolean;
  title: any;
  nested?: boolean;
}) {
  {
   

    return (
      <>
        <div className="flex flex-wrap py-2 md:py-0 border-b border-solid border-slate-700">
          <div className="w-full ">
            {/* mobile header view */}
            <MobileHeader nested={nested} title={title} />
            {/* desktop header view */}
            <DesktopHeader />
           
          </div>
        </div>
      </>
    );
  }
}
