import React from 'react'
import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'
import { isMobile } from 'react-device-detect'

export default function Header({
  title,
  nested,
}: {
  title: any
  nested?: boolean
}) {
  {
    return (
      <>
        {/* <div className="flex flex-wrap py-2 md:py-0 border-b border-solid border-slate-700">
          <div className="w-full "> */}
        {/* mobile header view */}
        {isMobile ? (
          // <MobileHeader nested={nested} title={title} />
          null
        ) : (
          <DesktopHeader />
        )}

        {/* desktop header view */}

        {/* </div>
        </div> */}
      </>
    )
  }
}
