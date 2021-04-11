import React from 'react'
import { Flex } from '@chakra-ui/react'

import { Title, ExternalLink } from '../components'
import { Context } from '../context'

export default () => {
  const {
    profile: { candidat },
  } = React.useContext(Context)
  return (
    <Flex m='5' flexDir='column'>
      <Title>Merci {candidat && candidat.prenom} d'avoir complété votre profil !</Title>
      <Title className='mt-3 mb-5'>Je le transfère tout de suite aux entreprises que j'ai identifié pour vous.</Title>
      <ExternalLink
        onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr')}
        className='gtm-lbabutton-finalstep'
      >
        Retourner sur la Bonne Alternance
      </ExternalLink>
    </Flex>
  )
}
