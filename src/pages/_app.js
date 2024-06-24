import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Layout from '../components/layouts/main.js'
import theme from '../lib/theme'
import '../styles/rah.css';
import Fonts from '../components/fonts.js'
import { AnimatePresence } from 'framer-motion';

const Website =({Component, pageProps, router }) => {
    return (
        <ChakraProvider theme={theme}>
             <CSSReset /> 
             <Fonts/>
             <Layout router={router}>
                <AnimatePresence initial={true}>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence> 
            </Layout> 
        </ChakraProvider>
    )
}

export default Website
