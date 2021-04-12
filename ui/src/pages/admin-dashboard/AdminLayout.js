import React, { useState, useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import { Navbar } from '../../components'

const paths = ['step', 'admin', 'merci']

export default ({ children, rest }) => {
  const { pathname } = useLocation()
  const [bkg, setBkg] = useState(false)

  useEffect(() => {
    if (paths.some((s) => pathname.includes(s))) {
      setBkg(true)
    } else {
      setBkg(false)
    }
  }, [pathname])

  return (
    <Container maxW='full' p='0' {...rest}>
      <Navbar />
      <Box bg={bkg && 'lightGrey'} h='100vh'>
        {children}
      </Box>
    </Container>
  )
}
