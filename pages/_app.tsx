import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Top App</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
