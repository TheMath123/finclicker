import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import GameContextProvider from '../contexts/Game'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </>
  ) 
}
