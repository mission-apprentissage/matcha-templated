import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'

import leaf from '../assets//images/leaf.svg'
import { RadioButton, Title } from '../components'

export default () => {
  let history = useHistory()

  return (
    <Flex justify='flex-start' flexDir='column' mt='5'>
      <Title>
        Enchanté, moi c'est Matcha,
        <br /> l'assistant des futurs apprentis
      </Title>
      <Title>
        Etes-vous bien à la recherche
        <br /> d'un <strong>contrat d'apprentissage</strong> ?
      </Title>
      <RadioButton onClick={() => history.push('/first')} className='gtm-nextbutton-homepage'>
        Oui !
      </RadioButton>
      <RadioButton onClick={() => history.push('/autres')} className='gtm-previousbutton-homepage'>
        Non
      </RadioButton>
      <Link className='d-flex justify-content-center' to='/first'>
        <img alt='logo' className='mt-5' src={leaf} />
      </Link>
    </Flex>
  )
}
