import Settings from '@/components/settings/Settings'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import React from 'react'

const profile = () => {
  
  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Settings"
      nested={true}
    >
      <Settings />
    </Main>
  )
}

export default profile
