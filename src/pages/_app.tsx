import '../styles/global.css'
import '../styles/components.css'
import 'react-chat-elements/dist/main.css'
import Player from '@/components/Player'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import RefetchHandler from '../components/RefetchHandler'

const AudioSetup = dynamic(() => import('@/components/Audio'), { ssr: false })

import type { AppProps } from 'next/app'
import { useState } from 'react'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  
  const [interval, setInterval] = useState(0)

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <Provider store={store}>
        <Component {...pageProps} />
        <RefetchHandler setInterval={setInterval} />
        <AudioSetup />
      <Player />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
