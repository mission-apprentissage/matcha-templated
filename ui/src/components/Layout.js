import { Box, Container, Divider } from '@chakra-ui/react'
import { Footer, Mission } from '../pages/HomePage'
import Navbar from './Navbar'

export default ({ children, background, footer = false }) => {
  return (
    <Container maxW='full' p='0'>
      <Navbar />
      <Box bg={background ?? 'lightGrey'} h='100vh'>
        {children}
      </Box>
      {footer && (
        <Box>
          <Mission />
          <Divider />
          <Footer />
        </Box>
      )}
    </Container>
  )
}
