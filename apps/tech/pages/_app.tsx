import { AppProps } from 'next/app';
import Head from 'next/head';
import { Banner } from "@nlresources/ui"
import './styles.css';

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tech App</title>
      </Head>
      <main className="app">
        <Banner text='Tech App' />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App
