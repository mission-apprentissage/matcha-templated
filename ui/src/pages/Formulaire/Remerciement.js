import { useEffect } from 'react'
import { Box, Text, Heading, Flex, Button } from '@chakra-ui/react'
import { Layout } from '../../components'
import { useLocation, useHistory } from 'react-router-dom'

export default (props) => {
  const history = useHistory()
  const {
    state: { isNew },
  } = useLocation()

  useEffect(() => window.scrollTo(0, 0))

  return (
    <Layout>
      <Box py={10}>
        <Heading align='center'>Votre formulaire a bien été enregistré !</Heading>
        {isNew ? (
          <Text align='center' pt='4'>
            Un email vous a été envoyé avec un lien d'accès unique à vos offres vous permettant d'en ajouter, de les
            modifier ou de les supprimer.
          </Text>
        ) : (
          <Flex justify='center' align='center' my='50'>
            <Button type='submit' rounded='10px' color='red' size='lg' onClick={() => history.goBack()}>
              Retour au formulaire
            </Button>
          </Flex>
        )}
      </Box>
    </Layout>
  )
}
