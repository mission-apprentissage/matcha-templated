import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Title, ExternalLink } from '../components'

export default () => {
  return (
    <Flex justify='flex-start' flexDir='column' mt='5'>
      <Title>
        Merci d'être passé.e sur <br /> Matcha. À bientôt !
      </Title>
      <ExternalLink
        onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr')}
        className='gtm-lbabutton-end'
      >
        Retourner sur la Bonne Alternance
      </ExternalLink>
    </Flex>
  )
}
