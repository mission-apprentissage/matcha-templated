import { Box, Flex, Image, Container, Spacer, Button } from '@chakra-ui/react'
import { RiAccountCircleLine } from 'react-icons/ri'

import logo from '../assets/images/logo.svg'
import logoMinistere from '../assets/images/logo-ministere.svg'
import useAuth from '../common/hooks/useAuth'
import { useHistory } from 'react-router'

export default () => {
  const [auth, setAuth] = useAuth()
  const history = useHistory()

  return (
    <Box py={3}>
      <Container maxW='container.xl'>
        <Flex justifyContent='flex-start' alignItems='center'>
          <Image src={logoMinistere} alt='logo ministere' />
          <Box pr={10} />
          <Image src={logo} alt='logo matcha' />
          <Spacer />
          {auth.permissions.isAdmin ? (
            <>
              <Button
                onClick={() => setAuth('')}
                fontWeight='normal'
                variant='link'
                color='bluefrance'
                leftIcon={<RiAccountCircleLine />}
              >
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => history.push('/login')}
                fontWeight='normal'
                variant='link'
                color='bluefrance'
                leftIcon={<RiAccountCircleLine />}
              >
                Se connecter
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
