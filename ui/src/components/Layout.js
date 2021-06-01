import { Box, Container, Divider, Spacer, Flex } from '@chakra-ui/react'
import { Footer, Mission } from '../pages/HomePage'
import Navbar from './Navbar'

export default ({ children, background }) => {
  return (
    <Container maxW='full' p='0'>
      <Flex direction='column' h='100vh'>
        <Navbar />
        <Box bg={background ?? 'lightGrey'} flexGrow='1'>
          {children}
        </Box>
        <Spacer />
        <Box>
          <Mission />
          <Divider />
          <Footer />
        </Box>
      </Flex>
    </Container>
  )
}
