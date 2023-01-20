import React from 'react'
import Link from 'next/link'
import { sideBarActive } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { RoutesType } from '../library/mainpage'

const GradientLink = (route: RoutesType) => {
  console.log(route)
  const router = useRouter()
  return (
  
      <div className="flex items-center p-2 capitalize text-base font-normal  rounded-lg ">
        {route.icon}
        <span className={`ml-3 ${sideBarActive(router, route.link)}`}>
          {route.title}
        </span>
      </div>
   
  )
}

export default GradientLink
