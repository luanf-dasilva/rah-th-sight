import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Layout from '../components/layouts/main.js'
import theme from '../lib/theme'
import '../styles/rah.css';
import Fonts from '../components/fonts.js'

const Website =({Component, pageProps, router }) => {
    return (
        <ChakraProvider theme={theme}>
             {/* <CSSReset /> */}
             <Fonts/>
             <Layout router={router}>
                <Component {...pageProps} key={router.route} />
            </Layout> 
        </ChakraProvider>
    )
}

export default Website
