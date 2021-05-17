import { Box, Flex, Image, Container } from '@chakra-ui/react'

import logo from '../assets/images/logo.svg'
import logoMinistere from '../assets/images/logo-ministere.svg'

export default () => {
  return (
    <Box py={3}>
      <Container maxW='container.xl'>
        <Flex justifyContent='flex-start' alignItems='center'>
          <Image src={logoMinistere} alt='logo ministere' />
          <Box pr={10} />
          <Image src={logo} alt='logo matcha' />
        </Flex>
      </Container>
    </Box>
  )
}
