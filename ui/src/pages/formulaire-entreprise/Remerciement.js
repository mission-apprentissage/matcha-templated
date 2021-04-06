import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { Layout } from '../../components'

export default () => {
  return (
    <Layout>
      <Flex justify='center' mt='6'>
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
