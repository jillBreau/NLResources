import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Banner } from "@nlresources/ui"
import './styles.css'

export function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Admin App</title>
      </Head>
      <main className="app">
        <Banner text='Admin App' />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default App
