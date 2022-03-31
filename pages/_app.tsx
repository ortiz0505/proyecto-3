import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import PrivateLayout from 'layout/PrivateLayout';
import Head from 'next/head';
import NotAuthorized from '@components/NotAuthorized';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{pageProps.name} | Proyecto 3</title>
      </Head>
      <PrivateLayout>
        {pageProps.auth ? <Component {...pageProps} /> : <NotAuthorized />}
      </PrivateLayout>
    </SessionProvider>
  );
}

export default MyApp;
