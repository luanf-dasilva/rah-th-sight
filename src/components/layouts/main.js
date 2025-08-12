import Navbar from '../navbar.js'
import Head from 'next/head'


const Layout = ({ children, router }) => {

    return (
	<>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title> rah th first sun</title>
            </Head>
            <Navbar path={router.asPath}/>
            {children}
	</>
    )
}

export default Layout
