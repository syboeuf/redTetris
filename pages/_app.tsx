import Layout from '@components/Layout/Layout.component'
import { SocketProvider } from '@contexts/Socket/Socket.context'
import { UserProvider } from '@contexts/User/User.context'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Red Tetris</title>
        <meta name="description" content="Online tetris multiplayer game (42 school project)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider>
        <SocketProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketProvider>
      </UserProvider>
    </>
  )
}
