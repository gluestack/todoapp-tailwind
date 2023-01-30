import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getUser, UserProvider } from '../context/user'
import { useApp } from '../context/app'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from "../services/apolloClient";
import { DataProvider } from '../context/data';

import { GlueProvider } from "@gluestack/glue-client-sdk-react";
import glue from "../glue";
import Toast from '../components/Toast';
import { AppProvider } from '../context/app';
import { IToast } from '../interfaces'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <GlueProvider glue={glue}>
      <UserProvider>
        <AppProvider>
          <Child>
            <Component {...pageProps} />
          </Child>
        </AppProvider>
      </UserProvider>
    </GlueProvider>
  </>
}

const Child = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = getUser();
  const { toast }: any = useApp();

  return (
    <ApolloProvider
      client={createApolloClient(user?.token)}>
      <DataProvider>
        {/* @ts-ignore */}
        <Toast toast={toast} />
        {children}
      </DataProvider>
    </ApolloProvider>
  )
}

export default MyApp
