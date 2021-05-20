import { Box, Container } from '@chakra-ui/react'
import Navbar from './Navbar'

export default ({ children, rest, background }) => {
  return (
    <Container maxW='full' p='0'>
      <Navbar />
      <Box bg={background ?? 'lightGrey'} h='100vh'>
        {children}
      </Box>
    </Container>
  )
}
