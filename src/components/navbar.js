import { useState, forwardRef } from 'react'
import { HamburgerIcon } from "@chakra-ui/icons"
import {
    Container,
    Box,
    Link,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react"

import Logo from "./logo"
import NextLink  from "next/link"
import ThemeToggleButton from './theme-toggle-button'
import LoginModal from './sessions/login-modal'
import useAuthStore from './sessions/auth-store'
import axios from "axios";
axios.defaults.withCredentials = true;

const LinkItem = ({ href = "", path, children, ...props}) => {
    const active = path === href
    const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900")
    return (
            <Link
                as={NextLink}
                href={href}
                p={2}
                bg={active ? "glassTeal": undefined }
                color={active ? "#202023": inactiveColor}
                {...props}
            >
                {children}
            </Link>
    )
}

const MenuLink = forwardRef((props, ref) => (
    <Link ref={ref} as={NextLink} {...props} />
  ))

const Navbar = props => {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isLoggedIn, login, logout } = useAuthStore();

    function getCookie() {
        const value = `; ${document.cookie}`;
        console.log(value)
        const parts = value.split(`; XSRF-TOKEN=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
    const handleLogin = async (username, password) => {
      try {
        const csrfRes = await axios.get(process.env.NEXT_PUBLIC_CSRF_AUTH_API_URL);
        const csrfTok = getCookie(csrfRes);
        input(csrfTok)
        const response = await axios.post(process.env.NEXT_PUBLIC_LOG_AUTH_API_URL, 
                                            { username, password }, 
                                            { headers: {'X-XSRF-TOKEN': csrfTok,
                                                        'Content-Type': 'application/json'}
                                            } 
        );
        // const response = await axios.post(process.env.NEXT_PUBLIC_LOG_AUTH_API_URL, { username, password }  );
        
        const jwtToken = response.data.token;
        // Save the token in localStorage or in state
        localStorage.setItem('token', jwtToken);
        login(); // Update state using Zustand store's login action
        setIsLoginModalOpen(false)
        // Close the modal, etc.
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      console.log(localStorage.getItem("token"))
      logout(); // Update state using Zustand store's logout action
      // Handle logout
    };

    const { path } = props.path

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue("#ffffff40", "#20202380")}
            style={{backdropFilter:"blur(10px)"}}
            zIndex={1}
        >
            <Container 
                display="flex" 
                p={2} 
                maxW="container.md" 
                wrap="wrap"
                align="center"
                justify="space-between"
            >            
                <Flex align="left" mr={5}>
                    <Flex as="h1" size="lg" letterSpacing={"tighter"}>
                        <Logo/>
                        <ThemeToggleButton/>
                    </Flex>
                </Flex>

                <Box flex={1} align="right">
                    <Flex 
                        direction={{base:"column", md:"row"}}
                        display={{base:"none", md:"flex"}}
                        width={{base:"full", md: "auto"}}
                        justifyContent="flex-end"
                        flexGrow={1}
                        mt={{base: 4, md: 0}}
                    >
                        <LinkItem href="/overview" path={path}>
                            Overview
                        </LinkItem>
                        <LinkItem href="/details" path={path}>
                            Details
                        </LinkItem>
                        <LinkItem href="/about" path={path}>
                            About
                        </LinkItem>
                        {!isLoggedIn ? (
                            <LinkItem colorScheme="blue" onClick={() => setIsLoginModalOpen(true)}>
                                Login
                            </LinkItem>
                            ) : (
                            <LinkItem colorScheme="red" onClick={handleLogout}>
                                Logout
                            </LinkItem>
                        )}

                    </Flex>

                    <Box ml={2} display={{base: 'block', md:'none'}} flexShrink={0}>
                        <Menu id="navbar-menu">
                            <MenuButton 
                                as={IconButton} 
                                icon={<HamburgerIcon/>} 
                                variant="outline" 
                                aria-label="Options"
                            />
                            <MenuList>
                                <MenuItem as={MenuLink} href="/overview">Overview</MenuItem>
                                <MenuItem as={MenuLink} href="/details">Details</MenuItem>
                                <MenuItem as={MenuLink} href="/about">About</MenuItem>
                                {!isLoggedIn ? (
                                    <MenuItem href="" as={MenuLink} onClick={() => setIsLoginModalOpen(true)}>
                                        Login
                                    </MenuItem>
                                    ) : (
                                    <MenuItem href="" as={MenuLink} onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                )}
                                {isLoggedIn && (
                                    <MenuItem  href="/manage"as={MenuLink}>Manage Account</MenuItem>
                                )} 
                            </MenuList>
                        </Menu>
                    </Box>

                    <LoginModal
                        isOpen={isLoginModalOpen}
                        onClose={() => setIsLoginModalOpen(false)}
                        onLogin={handleLogin}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar;