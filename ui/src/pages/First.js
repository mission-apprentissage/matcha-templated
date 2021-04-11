import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Button, Title, ChatBubble } from '../components'

export default () => {
  return (
    <Flex my='5' flexDir='column' justify='flex-start' p={[3, 0]}>
      <Title>
        J'ai dans mon carnet d'adresse des employeurs qui recrutent en apprentissage à qui transmettre votre profil.
      </Title>
      <Title className='mt-3 mb-3'>Qu'en dites-vous ?</Title>
      <ChatBubble darken='true'>
        Le questionnaire vous prendra seulement 10 minutes{' '}
        <span role='img' aria-label='thumbs-up'>
          👍
        </span>
      </ChatBubble>
      <Link to='/step-one'>
        <Button className='mt-4 mb-3 gtm-nextbutton-firstpage'>Super, ça m'intéresse !</Button>
      </Link>
      <Link to='/'>
        <Button className='gtm-previousbutton-firstpage'>Peut-être une autre fois</Button>
      </Link>
    </Flex>
  )
}
