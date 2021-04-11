import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Text } from '@chakra-ui/react'

import { Title, ExternalLink, RadioButton } from '../components'

export default () => {
  let history = useHistory()
  return (
    <Flex justify='flex-start' mt='5' flexDir='column'>
      <Title>
        Vous êtes à la recherche
        <br /> d'un<Text fontFamily='marianne-bold'>Stage</Text> ou d'un{' '}
        <Text fontFamily='marianne-bold'>
          contrat de
          <br />
          professionnalisation ?
        </Text>
      </Title>
      <Title>Découvrez les entreprises qui recrutent régulièrement :</Title>
      <ExternalLink
        onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr/recherche')}
        className='gtm-lbabutton-notlooking'
      >
        C'est parti
      </ExternalLink>
      <RadioButton onClick={() => history.push('/au-revoir')} className='gtm-nextbutton-notlooking'>
        Peut être une autre fois
      </RadioButton>
    </Flex>
  )
}
