import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex, Spacer, Image, Button, Container } from '@chakra-ui/react'

import { Context } from '../context'
import logo from '../assets/images/logo.svg'
import useAuth from '../common/hooks/useAuth'

export default () => {
  const {
    profile: { candidat },
  } = React.useContext(Context)
  let history = useHistory()
  const [auth, setAuth] = useAuth()

  return (
    <Box bg='lightGrey' p={3}>
      <Container maxW='full'>
        <Flex>
          <Image src={logo} alt='logo matcha' />
          <Spacer />
          {auth.permissions.isAdmin && (
            <Button
              variant='link'
              onClick={() => {
                setAuth('')
                history.push('/login')
              }}
            >
              Deconnexion
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
