import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'
import logo from '../../public/logo.jpg'

const LogoBox = styled.span`
    font-weight: bold;
    font-size 18px;
    display: inline-flex;
    align-items: center;
    height: 40px;
    line-height: 20px;
    padding: 10px;

    &:hover img{
        transform: rotate(180deg);
    }
`

const Logo = () => {
    return (
        <Link href="/">
            <LogoBox>
                {/* <img src='favicon.ico' width={40} height={40} alt='logo'/> */}

                {/* Why does this not work?*/}
                <Image src={logo} width={40} height={40}  alt='logo'/>
            </LogoBox>
        </Link>
    )
}

export default Logo