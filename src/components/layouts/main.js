import Head from 'next/head'
import { useState } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar.js'


const Layout = ({ children, router }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
      setIsLoggedIn(true);
      // Add your login logic here
    };
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      // Add your logout logic here
    }; 
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title> rah th first sun</title>
            </Head>

            <Navbar 
                path={router.asPath}        
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={handleLogout}/>

            <Container maxW="container.md" maxH="container.md" w="100vh" h="100vw" pt={14}>
                {children}
            </Container> 
        </Box>
    )
}

export default Layout
