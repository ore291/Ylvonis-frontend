import React from 'react'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'

import MainPage from '@/components/settings/mainpage'
import useAuth from '@/hooks/useAuth'

function Settings() {
  const auth = useAuth(true)
  return (
    <Main
      meta={<Meta title="Ylvonis" description="Ylvonis Music" />}
      title="Settings"
      nested={true}
    >
      <MainPage />
    </Main>
  )
}

export default Settings
