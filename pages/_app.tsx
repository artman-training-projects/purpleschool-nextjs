import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link href="/favicon.ico" rel="icon" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} property="og:url" />
        <meta content="ru_RU" property="og:locale" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
