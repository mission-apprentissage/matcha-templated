import { useEffect } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { Layout } from '../../components'

export default () => {
  useEffect(() => window.scrollTo(0, 0))
  return (
    <Layout>
      <Flex justify='center'>
        <Box>
          <Text align='center'>Nous avons bien reçu votre besoin !</Text>
          <Text align='center' pt='4'>
            Nous revenons vers vous très vite dès que nous aurons identifié les profils correspondant à votre demande.
          </Text>
        </Box>
      </Flex>
    </Layout>
  )
}
