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
    if (isMobile) {
      return <MobileHeader nested={nested} title={title} />
    } else {
      return <DesktopHeader />
    }
  }
}
