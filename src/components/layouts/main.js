import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar.js'


const Layout = ({ children, router }) => {


    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title> rah th first sun</title>
            </Head>

            <Navbar path={router.asPath}/>

            <Container maxW="container.md" maxH="container.md" w="100vh" h="100vw" pt={14}>
                {children}
            </Container> 
        </Box>
    )
}

export default Layout
