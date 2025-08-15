import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../lib/theme'

// workaround

// export default function Doc() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <ColorModeScript initialColorMode={theme.config.initialColorMode} />
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }


// wtf

export default class Doc extends Document {
    render() {
      return (
        <Html lang="en">
          <Head />
          <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
