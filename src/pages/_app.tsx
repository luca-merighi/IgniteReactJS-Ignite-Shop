import type { AppProps } from 'next/app'
import { GlobalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import logoImg from '../../public/logo.svg'
import Image from 'next/image'

GlobalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      
      <Component {...pageProps} />
    </Container>
  )
}
