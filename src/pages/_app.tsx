import '../styles/global.css'
import '../styles/components.css'
import 'react-chat-elements/dist/main.css'
import Player from '@/components/Player'
import dynamic from 'next/dynamic'
import Footer from '@/layouts/footer'

const AudioSetup = dynamic(() => import('@/components/Audio'), { ssr: false })

import type { AppProps } from 'next/app'

//dont forget to delete all my comments
//i really don't know how to right usefull comments

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <AudioSetup />
    <Player />
    <div className="fixed bottom-0 left-0 w-full">
      <div className=" ">{/* <NowPlaying /> */}</div>
      <Footer />
    </div>
  </>
)

export default MyApp
