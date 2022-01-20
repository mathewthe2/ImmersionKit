import '../styles/globals.css'
import Head from "next/head"
import { extendTheme } from "@chakra-ui/react"
import type { AppProps } from 'next/app'
import Layout from "components/layout"
import WebsiteContext from 'context/common/WebsiteContext';
import DictionaryDrawer from "components/dictionary/DictionaryDrawer";

import * as React from "react";
// 1. import 'ChakraProvider' component
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
const colors = {
  brand: {
    "50": "#EFE9FC",
    "100": "#D2C1F5",
    "200": "#B69AEF",
    "300": "#9972E9",
    "400": "#7D4AE2",
    "500": "#6023DC",
    "600": "#4D1CB0",
    "700": "#3A1584",
    "800": "#260E58",
    "900": "#13072C"
    //  400: "#9F7AEA",
    //  900: "#1a365d",
    //  800: "#153e75",
    //  700: "#2a69ac",
   },
 }
 const theme = extendTheme({ colors })
function App({ Component, pageProps }: AppProps) {
  const { isOpen: isOpenDictionary, onOpen: onOpenDictionary, onClose: onCloseDictionary } = useDisclosure();
  const [dictionarySearchKeyword, setDictionarySearchKeyword] = React.useState('');
  const lookupOnDictionary = (keyword: string) => {
    setDictionarySearchKeyword(keyword);
    onOpenDictionary();
  }
    return (
        <ChakraProvider theme={theme}>
          <WebsiteContext.Provider value={{isOpenDictionary, onOpenDictionary, lookupOnDictionary}}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <Layout>
           <Component {...pageProps} />
          </Layout>
          <DictionaryDrawer 
              isOpen={isOpenDictionary} 
              onOpen={onOpenDictionary}
              searchKeyword={dictionarySearchKeyword}
              onClose={onCloseDictionary}
            />
          </WebsiteContext.Provider>
        </ChakraProvider>
    );
}


// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
export default App
