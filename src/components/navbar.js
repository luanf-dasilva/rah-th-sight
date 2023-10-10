import { forwardRef } from 'react'
import Logo from "./logo"
import NextLink from "next/link"
import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    Button,
    useColorModeValue
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import ThemeToggleButton from './theme-toggle-button'
const LinkItem = ({ href, path, children, ...props}) => {
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

    const { path } = props
    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue("#ffffff40", "#20202380")}
            style={{backdropFilter:"blur(10px)"}}
            zIndex={1}
            {...props}
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
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar;