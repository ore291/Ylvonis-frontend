import '../styles/global.css'
import '../styles/components.css'
import 'react-chat-elements/dist/main.css'
import Player from '@/components/Player'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'

const AudioSetup = dynamic(() => import('@/components/Audio'), { ssr: false })

import type { AppProps } from 'next/app'


const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <AudioSetup />
    <Player />
    
  </>
)

export default MyApp
