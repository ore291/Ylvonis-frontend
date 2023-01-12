import '../styles/global.css';
import '../styles/components.css'
import 'react-chat-elements/dist/main.css'

import type { AppProps } from 'next/app';

//dont forget to delete all my comments
//i really don't know how to right usefull comments

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
