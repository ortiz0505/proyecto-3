import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import PrivateLayout from 'layout/PrivateLayout';
import Head from 'next/head';
import NotAuthorized from '@components/NotAuthorized';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <WidgetLoader />
        <Head>
          <title>{pageProps.page} | Proyecto 3</title>
        </Head>
        <PrivateLayout>
          {pageProps.auth ? <Component {...pageProps} /> : <NotAuthorized />}
        </PrivateLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
