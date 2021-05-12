import { useEffect } from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import { Layout } from '../../components'

export default () => {
  useEffect(() => window.scrollTo(0, 0))
  return (
    <Layout>
      <Box py={10}>
        <Heading align='center'>Votre formulaire a bien été enregistré !</Heading>
        <Text align='center' pt='4'>
          Un email vous a été envoyé avec un lien d'accès unique à vos offres vous permettant d'en ajouter, de les
          modifier ou de les supprimer.
        </Text>
      </Box>
    </Layout>
  )
}
