import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Global, css } from '@emotion/react';
import { ChakraProvider } from "@chakra-ui/react"

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          background: #ffcb1e;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #F5F7FA;
        }
      `}
    />
  );
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps}  />
    </ChakraProvider>
  )
}

export default MyApp
